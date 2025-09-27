<?php

namespace App\Services\Mail\Parsing;

use EmailReplyParser\Parser\EmailParser;
use Illuminate\Support\Facades\Http;

class GetStrippedHtmlFromEmail
{
    public function execute(string $email, string $type): string|null
    {
        $strippedHtml = null;
        if (config('services.openai.api_key')) {
            $strippedHtml = $this->usingOpenAi($email);
        }
        if (!$strippedHtml) {
            $strippedHtml = $this->usingLocalParsers($email, $type);
        }
        return $strippedHtml;
    }

    protected function usingOpenAi(string $email): string|null
    {
        $email = (new PurifyEmailBody())->execute($email);
        $response = Http::withToken(config('services.openai.api_key'))->post(
            'https://api.openai.com/v1/chat/completions',
            [
                'model' => 'gpt-3.5-turbo',
                'temperature' => 0.1,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' =>
                            'Remove all previous replies quoted by email client and user signatures from this email body: ' .
                            $email,
                    ],
                ],
            ],
        );

        return $response->json()['choices'][0]['message']['content'] ?? null;
    }

    protected function usingLocalParsers(
        string $email,
        string $type,
    ): string|null {
        if ($type === 'plain') {
            $email = (new EmailParser())->parse($email)->getVisibleText();
        }

        $email = (new StripQuotedEmailText())->execute($email);
        return (new StripEmailSignature())->execute($email);
    }
}
