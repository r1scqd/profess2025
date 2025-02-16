<?php

namespace App\Http\Controllers;

use App\Models\Event;

class EventController extends Controller
{
    public function events()
    {
        return response()->json(Event::query()->with('author')->get());
    }

    public function makeIcs($id)
    {
        $event = Event::find($id);
        $p = \Storage::disk('public');
        $p->makeDirectory('events_ics');
        $toSave = $p->path('events_ics/' . $id . '.ics');
        file_put_contents($toSave, "BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:$event->name
DTSTART:$event->date
DTEND:$event->date
DTSTAMP:$event->created_at
UID:$event->id
DESCRIPTION:$event->description
LOCATION:Россия
ORGANIZER:{$event->author->name}
STATUS:CONFIRMED
PRIORITY:0
END:VEVENT
END:VCALENDAR");
        return \Response::download($toSave);
    }
}
