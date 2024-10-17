import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-JiHMevco.js";
import { Head, router, useForm } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
const Header = ({ note }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: [
    "Expense - ",
    note.title,
    " ",
    /* @__PURE__ */ jsx("button", { className: "btn btn-error mt-5 ml-5", onClick: () => {
      const confirm = window.confirm("Do you want to delete this note?");
      if (confirm) {
        router.visit(window.appUrl + "/notes", {
          "method": "delete",
          data: { id: note.id }
        });
      }
    }, children: "[X] Delete" })
  ] }),
  /* @__PURE__ */ jsx("h3", { children: note.comment })
] });
function Edit({ auth, expenses, note }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: Header({ note }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Lists" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5 ml-5", onClick: () => {
              var _a;
              return (_a = document.getElementById("my_modal_3")) == null ? void 0 : _a.showModal();
            }, children: "Add Notes" }),
            /* @__PURE__ */ jsxs("button", { className: "btn btn-warning mt-5 ml-5", onClick: () => router.visit(window.appUrl + "/dashboard"), children: [
              "<--",
              "Back"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2 p-5", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", {}),
              /* @__PURE__ */ jsx("th", { children: "Title" }),
              /* @__PURE__ */ jsx("th", { children: "Comment" }),
              /* @__PURE__ */ jsx("th", { children: "Debit" }),
              /* @__PURE__ */ jsx("th", { children: "Credit" }),
              /* @__PURE__ */ jsx("th", { children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: expenses.length > 0 ? expenses == null ? void 0 : expenses.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { children: idx }),
              /* @__PURE__ */ jsx("td", { children: item.title }),
              /* @__PURE__ */ jsx("td", { children: item.comment }),
              /* @__PURE__ */ jsx("td", { children: item.debit }),
              /* @__PURE__ */ jsx("td", { children: item.credit }),
              /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("button", { className: "btn btn-error", onClick: () => {
                const confirm = window.confirm("Do you want to delete this expense?");
                if (confirm) {
                  router.visit(window.appUrl + "/expenses", {
                    "method": "delete",
                    data: { id: item.id }
                  });
                }
              }, children: "[x] Delete" }) })
            ] })) : /* @__PURE__ */ jsx("h2", { className: "p-6 text-gray-900 dark:text-gray-100", children: "Empty" }) })
          ] }) }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(NotesFormModal, {})
      ]
    }
  );
}
const NotesFormModal = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    comment: "",
    debit: 0,
    credit: 0
  });
  function submit(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get("noteId");
    post(window.appUrl + "/expenses?noteId=" + noteId);
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      alert("Failed to add!");
    } else {
      reset();
      document.getElementById("my_modal_3").close();
      alert("Success adding note!");
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
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Any comments?" }) }),
        /* @__PURE__ */ jsx("input", { type: "text", value: data.comment, onChange: (e) => setData("comment", e.target.value), placeholder: "Type here", className: "input input-bordered w-full " })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Debit" }) }),
        /* @__PURE__ */ jsx("input", { type: "number", value: data.debit, onChange: (e) => setData("debit", parseInt(e.target.value)), placeholder: "Type here", className: "input input-bordered w-full" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "label", children: /* @__PURE__ */ jsx("span", { className: "label-text", children: "Credit" }) }),
        /* @__PURE__ */ jsx("input", { type: "number", value: data.credit, onChange: (e) => setData("credit", parseInt(e.target.value)), placeholder: "Type here", className: "input input-bordered w-full" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5 mx-2", type: "submit", disabled: processing, children: "Submit" }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-primary mt-5", disabled: processing, onClick: (e) => {
        var _a;
        e.preventDefault();
        (_a = document.getElementById("my_modal_3")) == null ? void 0 : _a.close("");
      }, children: "Close" })
    ] })
  ] }) });
};
export {
  Edit as default
};
