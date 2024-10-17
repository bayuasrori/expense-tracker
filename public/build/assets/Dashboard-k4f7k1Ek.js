import{R as i,j as e,Y as h,y as u,b as m,W as p,r as b}from"./app-DhIR9mbf.js";import{A as g}from"./AuthenticatedLayout-DERyJchh.js";import"./ApplicationLogo-1Jqfs3IR.js";import"./transition-DTqCTtfV.js";function _({auth:a}){const[s,n]=i.useState(),[d,r]=i.useState(),o=()=>N(n);return i.useEffect(()=>{o()},[]),e.jsxs(g,{user:a.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Dashboard"}),children:[e.jsx(h,{title:"Dashboard"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsx("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:"You're logged in!"})})})}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsx("div",{className:"",children:e.jsx("button",{className:"btn btn-primary mt-5 ml-5",onClick:()=>{var l;return(l=document.getElementById("my_modal_3"))==null?void 0:l.showModal()},children:"Add Notes"})}),e.jsx("div",{className:"p-6 text-gray-900 dark:text-gray-100 grid sm:grid-cols-4 md:sm:grid-cols-4 gap-5",children:s==null?void 0:s.map(l=>e.jsx(j,{item:l,oc:c=>r(l)},l.id))})]})})}),e.jsx(w,{reloadNotes:o,noteId:d==null?void 0:d.id})]})}const j=({item:a,oc:s})=>e.jsx("div",{className:"card w-50 bg-base-100 shadow-xl",onClick:n=>s(n),children:e.jsxs("div",{className:"card-body",children:[e.jsx("h2",{className:"card-title",children:a.title}),e.jsxs("p",{children:["Total : ",a.total]}),e.jsxs("div",{className:"card-actions justify-end",children:[e.jsx("button",{className:"btn btn-primary",onClick:()=>{u.visit(window.appUrl+"/expenses",{method:"get",data:{noteId:a.id}})},children:"Detail"}),e.jsx("button",{className:"btn btn-success",onClick:n=>{document.getElementById("my_modal_3").showModal()},children:"Edit"})]})]})}),N=async a=>{const s=await m.get(window.appUrl+"/notes");a(s.data)},y=async a=>(await m.get(window.appUrl+"/notes?id="+a)).data,w=({reloadNotes:a,noteId:s})=>{const{data:n,setData:d,post:r,processing:o,errors:l,reset:c}=p({id:null,title:"",comment:"",total:0});b.useEffect(()=>{s&&(async()=>{const t=await y(s);d(t)})()},[s]);function x(t){t.preventDefault(),r(window.appUrl+"/notes"),console.log(l),Object.keys(l).length>0?alert("Failed to add!"):(c(),alert("Success adding note!"),document.getElementById("my_modal_3").close(),a())}return e.jsx("dialog",{id:"my_modal_3",className:"modal",children:e.jsxs("div",{className:"modal-box",children:[e.jsx("h2",{children:"Your Note!"}),e.jsx("form",{method:"dialog",children:e.jsx("button",{className:"btn btn-sm btn-circle btn-ghost absolute right-2 top-2",children:"✕"})}),e.jsxs("form",{onSubmit:t=>x(t),children:[e.jsxs("label",{className:"form-control w-full",children:[e.jsx("div",{className:"label",children:e.jsx("span",{className:"label-text",children:"What is the tittle?"})}),e.jsx("input",{type:"text",value:n.title,onChange:t=>d("title",t.target.value),placeholder:"Type here",className:"input input-bordered w-full "})]}),e.jsxs("label",{className:"form-control w-full",children:[e.jsx("div",{className:"label",children:e.jsx("span",{className:"label-text",children:"Your comment?"})}),e.jsx("input",{type:"text",value:n.comment,onChange:t=>d("comment",t.target.value),placeholder:"Type here",className:"input input-bordered w-full"})]}),e.jsxs("label",{className:"form-control w-full",children:[e.jsx("div",{className:"label",children:e.jsx("span",{className:"label-text",children:"Is there initial value?"})}),e.jsx("input",{type:"text",value:n.total,onChange:t=>d("total",parseInt(t.target.value)),placeholder:"Type here",className:"input input-bordered w-full"})]}),e.jsx("button",{className:"btn btn-primary mt-5",type:"submit",disabled:o,children:"Submit"}),e.jsx("button",{className:"btn btn-primary mt-5 ml-2",disabled:o,onClick:t=>{t.preventDefault(),document.getElementById("my_modal_3").close()},children:"Close"})]})]})})};export{_ as default};
