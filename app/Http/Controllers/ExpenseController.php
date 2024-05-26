<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function getExpenseList(Request $request)
    {
        $noteId = $request->noteId;
        $note = Notes::where('id', $noteId)->first();
        $expense = Expenses::where('noteId', $noteId)->get();
        return Inertia::render('Expenses/Lists', ["expenses" => $expense, "note" => $note]);
    }

    public function addExpense(Request $request)
    {
        $user = Auth::user();
        // $notes->userId = $user->id;
        // $notes->save();


        $newExpense = Expenses::create([
            "title" => $request->title,
            "noteId" => $request->noteId,
            "comment" => $request->comment,
            "debit" => $request->debit,
            "credit" => $request->credit
        ]);

        $debit_sum = Expenses::where('noteId', $request->noteId)->sum('debit');
        $credit_sum = Expenses::where('noteId', $request->noteId)->sum('credit');
        $total = $debit_sum - $credit_sum;

        $note = Notes::where('id', $request->noteId)->update([
            "total" => $total
        ]);


        return back();
    }

    public function deleteExpense(Request $request)
    {
        // Fetch the authenticated user
        $user = Auth::user();

        // Ensure we are deleting an expense only if it belongs to a note that belongs to the user
        $expense = Expenses::where('id', $request->id)
            ->whereHas('note', function ($query) use ($user) {
                $query->where('userId', $user->id); // Assuming notes table has a user_id field
            })->first();

        $expense->delete();

        $debit_sum = Expenses::where('noteId', $expense->noteId)->sum('debit');
        $credit_sum = Expenses::where('noteId', $expense->noteId)->sum('credit');
        $total = $debit_sum - $credit_sum;

        $note = Notes::where('id', $expense->noteId)->update([
            "total" => $total
        ]);


        return back();
    }
}
