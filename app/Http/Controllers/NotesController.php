<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Notes\CreateNoteRequest;
use Inertia\Redirect;

class NotesController extends Controller
{
    public function getNotesList(Request $request)
    {
        $user = Auth::user();
        if ($request->id) {
            return Notes::where("id", $request->id)->first();
        }
        return $user->notes;
    }

    public function addNote(CreateNoteRequest $notesRequest)
    {
        $user = Auth::user();
        // $notes->userId = $user->id;
        // $notes->save();
        if ($notesRequest->id) {
            Notes::where('id', $notesRequest->id)->update([
                "title" => $notesRequest->title,
                "comment" => $notesRequest->comment,
                "total" => $notesRequest->total,
            ]);
            return back();
        }

        $newNote = Notes::create([
            "title" => $notesRequest->title,
            "comment" => $notesRequest->comment,
            "total" => $notesRequest->total,
            "userId" => $user->id
        ]);

        if ($notesRequest->total > 0) {
            $newExpense = Expenses::create([
                "title" => 'Uang Awal',
                "noteId" => $newNote->id,
                "comment" => '-',
                "debit" => $notesRequest->total,
                "credit" => 0
            ]);
        }
        return back();
    }

    public function deleteNote(Request $request)
    {
        $user = Auth::user();
        Notes::where('id', $request->id)->where('userId', $user->id)->delete();
        return redirect('/dashboard');
    }
}
