@if (!$simplifiedThreading)
    @foreach($ticket->latest_replies as $reply)
        ## {{$reply->user->display_name}} replied, on {{$reply->created_at->diffForHumans()}}:

        {{ strip_tags($reply->body) }}

        -----------------------------------------------------------

    @endforeach
@else
    {{ strip_tags($ticket->latest_replies->first()->body) }}
@endif

{{$reference}}
