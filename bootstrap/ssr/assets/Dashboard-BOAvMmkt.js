import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-JiHMevco.js";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect } from "react";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
function Dashboard({ auth }) {
  const [notes, setNotes] = React.useState();
  const [selectedNote, setSelectedNote] = React.useState();
  const reloadNotes = () => getNoteList(setNotes);
  React.useEffect(() => {
    reloadNotes();
  }, []);
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: "You're logged in!" }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5 ml-5", onClick: () => {
            var _a;
            return (_a = document.getElementById("my_modal_3")) == null ? void 0 : _a.showModal();
          }, children: "Add Notes" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100 grid sm:grid-cols-4 md:sm:grid-cols-4 gap-5", children: notes == null ? void 0 : notes.map((item) => /* @__PURE__ */ jsx(NoteCard, { item, oc: (e) => setSelectedNote(item) }, item.id)) })
        ] }) }) }),
        /* @__PURE__ */ jsx(NotesFormModal, { reloadNotes, noteId: selectedNote == null ? void 0 : selectedNote.id })
      ]
    }
  );
}
const NoteCard = ({ item, oc }) => {
  return /* @__PURE__ */ jsx("div", { className: "card w-50 bg-base-100 shadow-xl", onClick: (e) => oc(e), children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
    /* @__PURE__ */ jsx("h2", { className: "card-title", children: item.title }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Total : ",
      item.total
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-actions justify-end", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary", onClick: () => {
        router.visit(window.appUrl + "/expenses", {
          method: "get",
          data: { noteId: item.id }
        });
      }, children: "Detail" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-success",
          onClick: (e) => {
            document.getElementById("my_modal_3").showModal();
          },
          children: "Edit"
        }
      )
    ] })
  ] }) });
};
const getNoteList = async (setNotes) => {
  const notes = await axios.get(window.appUrl + "/notes");
  setNotes(notes.data);
};
const getNoteDetail = async (id) => {
  const notes = await axios.get(window.appUrl + "/notes?id=" + id);
  return notes.data;
};
const NotesFormModal = ({ reloadNotes, noteId }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    id: null,
    title: "",
    comment: "",
    total: 0
  });
  useEffect(() => {
    if (noteId) {
      (async () => {
        const detail = await getNoteDetail(noteId);
        setData(detail);
      })();
    }
  }, [noteId]);
  function submit(e) {
    e.preventDefault();
    post(window.appUrl + "/notes");
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      alert("Failed to add!");
    } else {
      reset();
      alert("Success adding note!");
      document.getElementById("my_modal_3").close();
      reloadNotes();
    }
  }
  return /* @__PURE__ */ jsx("dialog", { id: "my_modal_3", className: "modal", children: /* @__PURE__ */ jsxs("div", { className: "modal-box", children: [
    /* @__PURE__ */ jsx("h2", { children: "Your Note!" }),
    /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", children: "✕" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => submit(e), children: [
      /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "What is the tittle?" }) }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.title, onChange: (e) => setData("title", e.target.value), placeholder: "Type here", className: "input input-bordered w-full " })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Your comment?" }) }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.comment, onChange: (e) => setData("comment", e.target.value), placeholder: "Type here", className: "input input-bordered w-full" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Is there initial value?" }) }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.total, onChange: (e) => setData("total", parseInt(e.target.value)), placeholder: "Type here", className: "input input-bordered w-full" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5", type: "submit", disabled: processing, children: "Submit" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5 ml-2", disabled: processing, onClick: (e) => {
        e.preventDefault();
        document.getElementById("my_modal_3").close();
      }, children: "Close" })
    ] })
  ] }) });
};
export {
  Dashboard as default
};
