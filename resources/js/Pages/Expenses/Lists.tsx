import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEvent } from 'react';

type Expense = {
    id: number,
    title: string,
    noteId: number,
    comment: string,
    debit: number,
    credit: number
}

type Note = {
    id: number,
    title: string,
    comment: string
}

const Header = ({ note }: { note: Note }) => (
    <div>
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Expense - {note.title} <button className="btn btn-error mt-5 ml-5" onClick={() => {
            const confirm = window.confirm("Do you want to delete this note?")
            if (confirm) {
                router.visit('/notes', {
                    'method': 'delete',
                    data: { id: note.id }
                });
            }
        }}>[X] Delete</button></h2>
        <h3>{note.comment}</h3>
    </div>
)
export default function Edit({ auth, expenses, note }: PageProps<{ expenses: Expense[], note: Note }>) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={Header({ note: note })}
        >
            <Head title="Lists" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <button className="btn btn-primary mt-5 ml-5" onClick={() => (document.getElementById('my_modal_3') as any)?.showModal()}>Add Notes</button>
                            <button className="btn btn-warning mt-5 ml-5" onClick={() => router.visit('dashboard')}>{'<--'}Back</button>

                        </div>
                        <div className='pt-2 p-5'>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Comment</th>
                                            <th>Debit</th>
                                            <th>Credit</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {expenses.length > 0 ? expenses?.map((item, idx) => (
                                            <tr >
                                                <th>{idx}</th>
                                                <td>{item.title}</td>
                                                <td>{item.comment}</td>
                                                <td>{item.debit}</td>
                                                <td>{item.credit}</td>
                                                <td>
                                                    <button className='btn btn-error' onClick={() => {
                                                        const confirm = window.confirm("Do you want to delete this expense?")
                                                        if (confirm) {
                                                            router.visit('/expenses', {
                                                                'method': 'delete',
                                                                data: { id: item.id }
                                                            });
                                                        }
                                                    }}>[x] Delete</button>
                                                </td>
                                            </tr>
                                        )) : <h2 className="p-6 text-gray-900 dark:text-gray-100">Empty</h2>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <NotesFormModal></NotesFormModal>

        </AuthenticatedLayout>
    );
}



const NotesFormModal: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        comment: '',
        debit: 0,
        credit: 0,
    })

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        const noteId = urlParams.get('noteId');

        post('/expenses?noteId=' + noteId)
        console.log(errors);

        if (Object.keys(errors).length > 0) {
            alert("Failed to add!")
        } else {
            reset();
            (document.getElementById('my_modal_3') as any).close();
            alert("Success adding note!");
        }
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h2>Your Note!</h2>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <form onSubmit={(e) => submit(e)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">What is the tittle?</span>
                        </div>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Type here" className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Any comments?</span>
                        </div>
                        <input type="text" value={data.comment} onChange={e => setData('comment', e.target.value)} placeholder="Type here" className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Debit</span>
                        </div>
                        <input type="number" value={data.debit} onChange={e => setData('debit', parseInt(e.target.value))} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Credit</span>
                        </div>
                        <input type="number" value={data.credit} onChange={e => setData('credit', parseInt(e.target.value))} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <button className='btn btn-primary mt-5 mx-2' type="submit" disabled={processing}>Submit</button>
                    <button className='btn btn-primary mt-5' disabled={processing} onClick={(e) => {
                        e.preventDefault();
                        (document.getElementById('my_modal_3') as any)?.close('');
                    }}>Close</button>

                </form>
            </div>
        </dialog>
    )
}