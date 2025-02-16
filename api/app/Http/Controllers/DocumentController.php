<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentCommentResource;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function documents()
    {
        return response()->json(DocumentResource::collection(Document::all()));
    }

    public function documentComments($id)
    {
        $doc = Document::find($id);
        if (!$doc) {
            return response()->json([
                'timestamp' => now()->timestamp,
                'message' => 'Нет документа',
                'errorCode' => 2005
            ], 404);
        }
        if ($doc->comments()->count() == 0) {
            return response()->json([
                'timestamp' => now()->timestamp,
                'message' => 'Нет комментариев',
                'errorCode' => 2005
            ], 404);
        }
        return response()->json(DocumentCommentResource::collection($doc->comments()->get()));
    }

    public function sendComment($id, Request $request)
    {
        $doc = Document::find($id);
        if (!$doc) {
            return response()->json([
                'timestamp' => now()->timestamp,
                'message' => 'Нет документа',
                'errorCode' => 2005
            ], 404);
        }
        $user = auth()->user();
        $entry = $request->validate([
            'text' => ['required', 'string']
        ]);

        $com = $doc->comments()->create([
            'text' => $entry['text'],
            'author_id' => $user->id,
        ]);
        return response()->json(DocumentCommentResource::make($com));
    }
}
