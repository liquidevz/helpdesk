<?php namespace App\Services\Mail\Parsing;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use InvalidArgumentException;
use ZBateson\MailMimeParser\Message;

class ParsedEmail implements Jsonable, Arrayable
{
    public function __construct(protected array $email)
    {
    }

    /**
     * This will strip quoted replies from email and
     * remove any not allowed html tags.
     */
    public function getNormalizedBody(array $cidMap = []): string
    {
        $strippedBody = $this->email['body']['stripped-html'] ?? null;
        if (!$strippedBody) {
            if ($this->hasBody('html')) {
                $strippedBody = $this->getStrippedHtml('html');
            }
            if (!$strippedBody) {
                $strippedBody = $this->getStrippedHtml('plain');
            }
        }

        // replace CIDs in img src with actual image urls
        foreach ($cidMap as $cid => $url) {
            $strippedBody = str_replace("cid:$cid", $url, $strippedBody);
        }

        $purifier = new PurifyEmailBody();
        $purifiedBody = $purifier->execute($strippedBody);
        if (!$purifiedBody) {
            $purifiedBody = $purifier->execute($this->getStrippedHtml('plain'));
        }

        return $purifiedBody;
    }

    protected function getStrippedHtml(string $type): ?string
    {
        return (new GetStrippedHtmlFromEmail())->execute(
            $this->getBody($type),
            $type,
        );
    }

    public function getSubject(): string
    {
        return $this->getHeader('Subject') ?: '(no subject)';
    }

    public function getSenderEmail(): string
    {
        $header = $this->getHeader('Reply-To') ?: $this->getHeader('From');

        // parse header and extract email address
        $email = Message::from("From: $header", false)
            ->getHeader('From')
            ->getEmail();

        if ($email) {
            return $email;
        }

        throw new InvalidArgumentException(
            "Could not extract email address from [$header]",
        );
    }

    public function getMessageId(): string
    {
        return $this->getHeader('Message-ID') ?? $this->getHeader('Message-Id');
    }

    public function getHeader(string $name): ?string
    {
        return Arr::get($this->email, "headers.$name");
    }

    public function hasHeader(string $name): bool
    {
        return Arr::has($this->email, "headers.$name");
    }

    public function getHeaders(): array
    {
        return Arr::get($this->email, 'headers', []);
    }

    public function getBody(string $type): ?string
    {
        return Arr::get($this->email, "body.$type");
    }

    public function hasBody(string $type): bool
    {
        return Arr::get($this->email, "body.$type") !== null;
    }

    public function getAttachments(string $type): Collection
    {
        $attachments = Arr::get($this->email, 'attachments', []);

        // if attachment has a CID then it's inline, otherwise it's 'regular'
        return collect($attachments)->filter(function ($attachment) use (
            $type,
        ) {
            $cidEmbedded =
                $attachment['cid'] &&
                Str::contains($this->getBody('html'), $attachment['cid']);

            //if email body does not have attachment CID embedded, treat attachment as 'regular'
            if ($type === 'inline') {
                return $cidEmbedded;
            } else {
                return !$cidEmbedded;
            }
        });
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->toArray(), $options);
    }

    public function toArray(): array
    {
        return [
            'headers' => $this->getHeaders(),
            'body' => [
                'plain' => $this->getBody('plain'),
                'html' => $this->getBody('html'),
            ],
        ];
    }
}
