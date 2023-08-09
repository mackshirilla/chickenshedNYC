"use strict";(()=>{var x=document.getElementById("firstNameInput"),Q=document.getElementById("firstNameError");function Se(){return x.hasAttribute("required")&&x.value.trim()===""?(Q.textContent="First name required",Q.style.display="block",x.classList.add("error"),!1):(Q.textContent="",Q.style.display="none",x.classList.remove("error"),!0)}x&&x.addEventListener("blur",Se);var H=document.getElementById("lastNameInput"),X=document.getElementById("lastNameError");function qe(){return H.hasAttribute("required")&&H.value.trim()===""?(X.textContent="Last name required",X.style.display="block",H.classList.add("error"),!1):(X.textContent="",X.style.display="none",H.classList.remove("error"),!0)}H&&H.addEventListener("blur",qe);var f=document.getElementById("emailInput"),B=document.getElementById("emailError");function Ae(){let t=/^\S+@\S+\.\S+$/;return f.hasAttribute("required")&&f.value.trim()===""?(B.textContent="Email is required",B.style.display="block",f.classList.add("error"),!1):f.value.trim()!==""&&!t.test(f.value)?(B.textContent="Please enter a valid email",B.style.display="block",f.classList.add("error"),!1):(B.textContent="",B.style.display="none",f.classList.remove("error"),!0)}f&&f.addEventListener("blur",Ae);var y=document.getElementById("phoneInput"),b=document.getElementById("phoneError");function Le(t){let e=t.replace(/\D/g,"");return e.length===0?"":e.length<4?`(${e}`:e.length<7?`(${e.slice(0,3)}) ${e.slice(3)}`:`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6,10)}`}function Ne(){let t=/^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;return y.required&&y.value.trim()===""?(b.textContent="Phone is required",b.style.display="block",y.classList.add("error"),!1):y.value.trim()!==""&&!t.test(y.value)?(b.textContent="Please enter a valid phone number",b.style.display="block",y.classList.add("error"),!1):(y.value=Le(y.value),b.textContent="",b.style.display="none",y.classList.remove("error"),!0)}y&&y.addEventListener("input",t=>{let e=t.target;e.value=Le(e.value),Ne()});var M=document.getElementById("dobInput"),Z=document.getElementById("dobError");function Ce(){return M.hasAttribute("required")&&M.value.trim()===""?(Z.textContent="Date of Birth is required",Z.style.display="block",M.classList.add("error"),!1):(Z.textContent="",Z.style.display="none",M.classList.remove("error"),!0)}M&&M.addEventListener("blur",Ce);var S=document.getElementById("genderInput"),ee=document.getElementById("genderError");function we(){return S.hasAttribute("required")&&S.value.trim()===""?(ee.textContent="Gender is required",ee.style.display="block",S.classList.add("error"),!1):(ee.textContent="",ee.style.display="none",S.classList.remove("error"),!0)}S&&S.addEventListener("blur",we);var q=document.getElementById("schoolInput"),te=document.getElementById("schoolError");function Pe(){return q.hasAttribute("required")&&q.value.trim()===""?(te.textContent="School name is required",te.style.display="block",q.classList.add("error"),!1):(te.textContent="",te.style.display="none",q.classList.remove("error"),!0)}q&&q.addEventListener("blur",Pe);var A=document.getElementById("gradeInput"),ne=document.getElementById("gradeError");function Re(){return A.hasAttribute("required")&&A.value.trim()==="N/A"?(ne.textContent="Grade is required",ne.style.display="block",A.classList.add("error"),!1):(ne.textContent="",ne.style.display="none",A.classList.remove("error"),!0)}A&&A.addEventListener("blur",Re);var ie=document.getElementById("ethnicityInput"),k=document.getElementById("ethnicityError");function Oe(){return ie.hasAttribute("required")&&ie.value.trim()===""?(k.textContent="Ethnicity is required",k.style.display="block",ie.classList.add("error"),!1):(k.textContent="",k.style.display="none",k.classList.remove("error"),!0)}k&&ie.addEventListener("blur",Oe);var N=document.getElementById("healthInput"),se=document.getElementById("healthError");function $e(){return N.hasAttribute("required")&&N.value.trim()===""?(se.textContent="This field is required",se.style.display="block",N.classList.add("error"),!1):(se.textContent="",se.style.display="none",N.classList.remove("error"),!0)}N&&N.addEventListener("blur",$e);var C=document.getElementById("emergencyContact"),oe=document.getElementById("emergencyError");function Fe(){return C.hasAttribute("required")&&C.value.trim()===""?(oe.textContent="This field is required",oe.style.display="block",C.classList.add("error"),!1):(oe.textContent="",oe.style.display="none",C.classList.remove("error"),!0)}C&&C.addEventListener("blur",Fe);var w=document.getElementById("dismissal"),re=document.getElementById("dismissalError");function Ue(){return w.hasAttribute("required")&&w.value.trim()===""?(re.textContent="This field is required",re.style.display="block",w.classList.add("error"),!1):(re.textContent="",re.style.display="none",w.classList.remove("error"),!0)}w&&w.addEventListener("blur",Ue);var g=document.getElementById("additionalEmail"),D=document.getElementById("additionalEmailError");function Je(){let t=/^\S+@\S+\.\S+$/;return g.hasAttribute("required")&&g.value.trim()===""?(D.textContent="Email is required",D.style.display="block",g.classList.add("error"),!1):g.value.trim()!==""&&!t.test(g.value)?(D.textContent="Please enter a valid email",D.style.display="block",g.classList.add("error"),!1):(D.textContent="",D.style.display="none",g.classList.remove("error"),!0)}g&&g.addEventListener("blur",Je);var P=document.getElementById("interestInput"),le=document.getElementById("interestError");function ae(){return P.hasAttribute("required")&&P.value.trim()===""?(le.textContent="This field is required",le.style.display="block",P.classList.add("error"),!1):(le.textContent="",le.style.display="none",P.classList.remove("error"),!0)}P&&P.addEventListener("blur",ae);var E=[],de=null;async function We(t){let e=await fetch(`https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok){let o=await e.json();throw new Error(o.message||"An error occurred")}return(await e.json()).allStudentProfiles}async function Ge(){let t=localStorage.getItem("profile"),e=t?JSON.parse(t):null,s=e==null?void 0:e.userID,o=e==null?void 0:e.role,n=document.getElementById("loadingAnimation"),r=document.getElementById("registrationFormWrapper"),d=document.getElementById("NoStudentProfiles"),c=document.getElementById("studentAccount");r.style.display="none",c.style.display="none",d.style.display="none",n.style.display="block",o==="student"?(c.style.display="block",r.style.display="none"):(c.style.display="none",r.style.display="block");try{let i=await We(s);if(i.length>0){let I=document.getElementById("studentList"),u=document.getElementById("studentItem");I.innerHTML="",i.forEach(l=>{let a=u.cloneNode(!0),T=a.querySelector(".fs_checkbox-1_label"),L=a.querySelector('input[type="checkbox"]');T&&(T.textContent=`${l.firstName} ${l.lastName}`),L&&(L.value=l.id.toString(),L.addEventListener("change",()=>{if(L.checked)E.push(l);else{let v=E.findIndex(h=>h.id===l.id);v!==-1&&E.splice(v,1)}console.log("Selected Student Profiles:",E)})),I.appendChild(a)}),u.style.display="none",I.style.display="grid",n.style.display="none",r.style.display="block"}else n.style.display="none",d.style.display="block",r.style.display="none"}catch(i){console.error("An error occurred while fetching student profiles:",i),alert("An error occurred while fetching student profiles.")}}function Ve(){document.querySelectorAll('input[name="paymentType"]').forEach(e=>{e.addEventListener("change",function(){if(this.checked)if(de=this.getAttribute("priceid"),console.log(`Selected payment type: ${this.value}`),console.log(`Updated priceID: ${de}`),this.value==="Deposit"){let s=document.getElementById("depositOnly");s.value="true";let o=document.getElementById("toggleNoOverflow");o.style.height="16rem"}else{let s=document.getElementById("depositOnly");s.value="false";let o=document.getElementById("toggleNoOverflow");o.style.height="0rem"}})})}function je(){let t=document.getElementById("submitButton"),e=document.getElementById("studentListError"),s=document.getElementById("paymentError"),o=document.getElementById("submitError"),n=document.getElementById("requestLoadingAnimation");t&&t.addEventListener("click",async r=>{r.preventDefault();let d=!1;e&&(e.style.display="none"),s&&(s.style.display="none"),o&&(o.style.display="none"),E.length===0&&(e&&(e.style.display="block",e.innerText="This field is required"),d=!0),de||(s&&(s.style.display="block",s.innerText="This field is required"),d=!0);let c=document.getElementById("interestInput"),i=document.getElementById("interestError"),I=c.value;if(ae(I)||(i?(i.style.display="block",i.innerText="This field is required"):i.style.display="none",d=!0),d){o&&(o.style.display="block"),o&&(o.innerText="Please make sure all required fields are filled");return}let l=localStorage.getItem("profile"),a=l?JSON.parse(l):null,T=a==null?void 0:a.userID,L=a==null?void 0:a.firstName,v=a==null?void 0:a.lastName,h=document.getElementById("finAid"),R=document.getElementById("finPlan"),O=document.getElementById("contactListID"),$=document.getElementById("sessionID"),F=document.getElementById("followUpEmailID"),U=document.getElementById("color"),J=document.getElementById("imageURL"),W=document.getElementById("program"),G=document.getElementById("workshop"),V=document.getElementById("sessionTime"),j=document.getElementById("sessionDay"),_=document.getElementById("depositOnly"),z=document.getElementById("startDate"),Y=document.getElementById("endDate"),K=document.querySelectorAll('input[name="paymentType"]:checked')[0],ce=K?K.getAttribute("unitAmount"):null,ue=E.map(p=>p.id),me=E.map(p=>`${p.firstName} ${p.lastName}`),pe=U?U.value:"",ye=J?J.value:"",Ee=W?W.value:"",Ie=G?G.value:"",fe=V?V.value:"",m=j?j.value:"",he=h?h.checked:!1,Te=R?R.checked:!1,Be=_?_.value:"false",be=F?F.value:"",De=$?$.value:"",ke=O?O.value:"",xe=z?z.value:"",He=Y?Y.value:"",Me=ke.split(",").map(p=>p.trim()).filter(p=>p);n&&(n.style.display="block");try{if((await fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/cart_items",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userID:T,firstName:L,lastName:v,studentIDs:ue,studentNames:me,priceID:de,unitAmount:ce,color:pe,imageURL:ye,program:Ee,workshop:Ie,sessionTime:fe,sessionDay:m,finAid:he,finPlan:Te,depositOnly:Be,quantity:E.length,emailFollowUpID:be,sessionID:De,contactLists:Me,startDate:xe,endDate:He,interest:I})})).ok)n&&(n.style.display="none"),window.location.href="/my-account/cart";else throw new Error("An error occurred while submitting the form")}catch(p){console.error(p),n&&(n.style.display="none"),o&&(o.style.display="block")}})}function _e(){let t=document.getElementById("freeSubmitButton"),e=document.getElementById("studentListError"),s=document.getElementById("submitError"),o=document.getElementById("freeRequestLoadingAnimation");t&&t.addEventListener("click",async n=>{n.preventDefault();let r=!1;if(e&&(e.style.display="none"),s&&(s.style.display="none"),E.length===0&&(e&&(e.style.display="block",e.innerText="This field is required"),r=!0),r){s&&(s.style.display="block",s.innerText="Please make sure all required fields are filled");return}let d=document.getElementById("interestInput"),c=document.getElementById("interestError"),i=d.value;ae(i)||(c?(c.style.display="block",c.innerText="This field is required"):c.style.display="none",r=!0);let u=localStorage.getItem("profile"),l=u?JSON.parse(u):null,a=l==null?void 0:l.userID,T=l==null?void 0:l.firstName,L=l==null?void 0:l.lastName,v=document.getElementById("contactListID"),h=document.getElementById("sessionID"),R=document.getElementById("followUpEmailID"),O=document.getElementById("color"),$=document.getElementById("imageURL"),F=document.getElementById("program"),U=document.getElementById("workshop"),J=document.getElementById("sessionTime"),W=document.getElementById("sessionDay"),G=document.getElementById("startDate"),V=document.getElementById("endDate"),j=E.map(m=>m.id),_=E.map(m=>`${m.firstName} ${m.lastName}`),z=O?O.value:"",Y=$?$.value:"",ge=F?F.value:"",K=U?U.value:"",ce=J?J.value:"",ue=W?W.value:"",me=R?R.value:"",pe=h?h.value:"",ye=v?v.value:"",Ee=G?G.value:"",Ie=V?V.value:"",fe=ye.split(",").map(m=>m.trim()).filter(Boolean);o&&(o.style.display="block");try{if((await fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/FREE_REGISTRATION",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userID:a,firstName:T,lastName:L,studentIDs:j,studentNames:_,color:z,imageURL:Y,program:ge,workshop:K,sessionTime:ce,sessionDay:ue,emailFollowUpID:me,sessionID:pe,contactLists:fe,startDate:Ee,endDate:Ie,interest:i})})).ok)window.location.href="/successful-checkout";else throw new Error("An error occurred while submitting the form")}catch(m){console.error(m),s&&(s.style.display="block")}finally{o&&(o.style.display="none")}})}document.addEventListener("DOMContentLoaded",function(){let t=document.getElementById("NotLoggedIn"),e=document.getElementById("registrationFormWrapper"),s=document.getElementById("loadingAnimation");if(localStorage.getItem("profile")===null?(t&&(t.style.display="block"),e&&(e.style.display="none",s.style.display="none")):(t&&(t.style.display="none"),e&&(e.style.display="block",Ge())),localStorage.getItem("role")==="student"){let u=document.getElementById("studentAccount"),l=document.getElementById("registrationFormWrapper");u&&(u.style.display="block",l.style.display="none")}let n=document.getElementById("finAid"),r=document.getElementById("finPlan"),d=document.querySelector('input[name="paymentType"][value="Deposit"]'),c=Array.from(document.querySelectorAll('input[name="paymentType"]:not([value="Deposit"])'));n&&n.addEventListener("change",()=>{(n.checked||r&&r.checked)&&d.click()}),r&&r.addEventListener("change",()=>{(r.checked||n&&n.checked)&&d.click()}),c.forEach(u=>{u.addEventListener("change",()=>{u.checked&&(n&&(n.checked=!1),r&&(r.checked=!1))})}),Ve(),je(),_e();let i=document.getElementById("finAidText");n&&n.addEventListener("change",()=>{n.checked?i.innerText="Yes":i.innerText="No"});let I=document.getElementById("finPlanText");r&&r.addEventListener("change",()=>{r.checked?I.innerText="Yes":I.innerText="No"})});var ve=document.getElementById("addStudent");ve&&ve.addEventListener("click",()=>{localStorage.setItem("redirectURL",window.location.href),window.location.href="/create-account/add-student"});var ze=localStorage.getItem("role");if(ze==="student"){let t=document.getElementById("addStudentsWrapper");t&&(t.style.display="none")}})();
