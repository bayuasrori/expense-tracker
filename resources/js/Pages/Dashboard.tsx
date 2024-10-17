import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import { useForm } from '@inertiajs/react'
import { FormEvent, useEffect } from 'react';
import { log } from 'console';
import React from 'react';
import { router } from '@inertiajs/react'


type Note = {
    id: number | undefined | null,
    title: string,
    comment: string,
    total: number
}

var appUrl

export default function Dashboard({ auth }: PageProps) {

    const [notes, setNotes] = React.useState<Note[]>();
    const [selectedNote, setSelectedNote] = React.useState<Note>();
    const reloadNotes = () => getNoteList(setNotes);
    React.useEffect(() => {
        reloadNotes()

    }, [])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <button className="btn btn-primary mt-5 ml-5" onClick={() => (document.getElementById('my_modal_3') as any)?.showModal()}>Add Notes</button>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 grid sm:grid-cols-4 md:sm:grid-cols-4 gap-5">

                            {notes?.map((item: Note) => (
                                <NoteCard item={item} key={item.id} oc={(e) => setSelectedNote(item)}></NoteCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <NotesFormModal reloadNotes={reloadNotes} noteId={selectedNote?.id}></NotesFormModal>
        </AuthenticatedLayout>
    );
}

const NoteCard: React.FC<{ item: Note, oc: (arg: any) => void }> = ({ item, oc }) => {
    return (
        <div className="card w-50 bg-base-100 shadow-xl" onClick={(e) => oc(e)}>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>Total : {item.total}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => {
                        // console.log('redirect')
                        router.visit(window.appUrl + '/expenses', {
                            method: 'get',
                            data: { noteId: item.id }
                        })
                    }}>Detail</button>
                    <button className='btn btn-success'
                        onClick={(e) => {
                            (document.getElementById('my_modal_3') as any).showModal();

                        }}>Edit</button>
                </div>
            </div>
        </div>
    )
}


const getNoteList = async (setNotes: React.Dispatch<React.SetStateAction<Note[] | undefined>>) => {
    const notes = await axios.get(window.appUrl + '/notes');
    setNotes(notes.data)
}
const getNoteDetail = async (id: number) => {
    const notes = await axios.get(window.appUrl + '/notes?id=' + id);
    return notes.data
}

const NotesFormModal: React.FC<{ reloadNotes: () => Promise<void>, noteId: number | null | undefined }> = ({ reloadNotes, noteId }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: null,
        title: '',
        comment: '',
        total: 0,
    })

    useEffect(() => {
        if (noteId) {
            (async () => {
                const detail = await getNoteDetail(noteId);
                setData(detail)
            })()
        }
    }, [noteId])

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post(window.appUrl + '/notes')
        console.log(errors);

        if (Object.keys(errors).length > 0) {
            alert("Failed to add!")
        } else {
            reset();
            alert("Success adding note!");
            (document.getElementById('my_modal_3') as any).close();
            reloadNotes();
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
                            <span className="label-text">Your comment?</span>
                        </div>
                        <input type="text" value={data.comment} onChange={e => setData('comment', e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Is there initial value?</span>
                        </div>
                        <input type="text" value={data.total} onChange={e => setData('total', parseInt(e.target.value))} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <button className='btn btn-primary mt-5' type="submit" disabled={processing}>Submit</button>
                    <button className='btn btn-primary mt-5 ml-2' disabled={processing} onClick={(e) => {
                        e.preventDefault();
                        (document.getElementById('my_modal_3') as any).close();
                    }}>Close</button>

                </form>
            </div>
        </dialog>
    )
}