"use strict";(()=>{function ne(){let e=localStorage.getItem("authToken");return fetch("https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/me",{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).catch(t=>{console.error("Error:",t);let s=document.querySelector(".page-wrapper");s&&s.hasAttribute("gatedContent")?(window.location.href="/login",localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role")):(localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role"))})}function se(){let e=localStorage.getItem("profile");if(!e)return Promise.reject(new Error("Profile not found in localStorage"));let s=JSON.parse(e).id;if(!s)return Promise.reject(new Error("Guardian ID not found in profile"));let c=`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${s}`;return fetch(c,{method:"GET",headers:{"Content-Type":"application/json"}}).then(n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()}).then(n=>{var y,p,W,Q,Z,K,V,X,ee,te;let r=document.getElementById("firstNameInput");r.value=(y=n.firstName)!=null?y:"";let m=document.getElementById("lastNameInput");m.value=(p=n.lastName)!=null?p:"";let l=document.getElementById("phoneInput");l.value=(W=n.phoneNumber)!=null?W:"";let i=document.getElementById("emailInput");i.value=(Q=n.email)!=null?Q:"";let o=document.getElementById("sendTexts");o.checked=(Z=n.sendTexts)!=null?Z:!1;let a=document.getElementById("yMember");a.checked=n.yMembership!==void 0&&n.yMembership!=="";let d=document.getElementById("membershipNumber");d.value=(K=n.yMembership)!=null?K:"";let u=document.getElementById("profileImage");return u.src=(X=(V=n.image)==null?void 0:V.url)!=null?X:"https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg",u.alt=`${(ee=n.firstName)!=null?ee:""} ${(te=n.lastName)!=null?te:""}'s profile picture`,n}).catch(n=>{throw console.error("Error:",n),n})}async function re(){let e=localStorage.getItem("profile"),t=e?JSON.parse(e):null,s=t?t.id:null;if(!s)return;let c=document.getElementById("loadingAnimation"),n=document.getElementById("firstNameInput"),r=document.getElementById("lastNameInput"),m=document.getElementById("emailInput"),l=document.getElementById("phoneInput"),i=document.getElementById("sendTexts"),o=document.getElementById("yMember"),a=document.getElementById("membershipNumber");if(c&&n&&r&&m&&l&&i&&o&&a){c.style.display="block";let d={firstName:n.value,lastName:r.value,email:m.value,phone:l.value,sendTexts:i.checked,isYMember:o.checked,membershipNumber:a.value,guardianID:s};try{let u=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardians/${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(u.ok)window.location.reload();else{let y=await u.json(),p=document.getElementById("submitError");p&&(p.style.display="block",p.textContent=y.message),c&&(c.style.display="none")}}catch(u){console.error(u)}finally{c&&(c.style.display="none")}}}function oe(e){e.addEventListener("change",async()=>{var m;let t=document.getElementById("profileImage"),s=document.getElementById("fileError"),c=document.getElementById("fileUploaded"),n=document.getElementById("loadingImageAnimation"),r=(m=e.files)==null?void 0:m[0];if(r){if(r.size>2*1024*1024){s.textContent="File size must be less than 2MB",s.style.display="block";return}let l=new FileReader;l.onload=async()=>{t.src=l.result,s.textContent="",s.style.display="none",n.style.display="flex";try{let i=localStorage.getItem("profile"),o=i?JSON.parse(i):null,a=o?o.id:null,d=await fetch("https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/guardianImages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({guardianID:a,guardianImage:l.result})});if(d.ok)c.style.display="block";else throw new Error(`Error: ${d.status} ${d.statusText}`)}catch(i){s.textContent=i.message,s.style.display="block"}finally{n.style.display="none"}},l.readAsDataURL(r)}else t.src="https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg",s.textContent="",s.style.display="none"})}var v=document.getElementById("firstNameInput"),C=document.getElementById("firstNameError");function F(){return v.hasAttribute("required")&&v.value.trim()===""?(C.textContent="First name required",C.style.display="block",v.classList.add("error"),!1):(C.textContent="",C.style.display="none",v.classList.remove("error"),!0)}v&&v.addEventListener("blur",F);var b=document.getElementById("lastNameInput"),w=document.getElementById("lastNameError");function z(){return b.hasAttribute("required")&&b.value.trim()===""?(w.textContent="Last name required",w.style.display="block",b.classList.add("error"),!1):(w.textContent="",w.style.display="none",b.classList.remove("error"),!0)}b&&b.addEventListener("blur",z);var E=document.getElementById("emailInput"),I=document.getElementById("emailError");function Y(){let e=/^\S+@\S+\.\S+$/;return E.hasAttribute("required")&&E.value.trim()===""?(I.textContent="Email is required",I.style.display="block",E.classList.add("error"),!1):E.value.trim()!==""&&!e.test(E.value)?(I.textContent="Please enter a valid email",I.style.display="block",E.classList.add("error"),!1):(I.textContent="",I.style.display="none",E.classList.remove("error"),!0)}E&&E.addEventListener("blur",Y);var g=document.getElementById("phoneInput"),h=document.getElementById("phoneError");function ae(e){let t=e.replace(/\D/g,"");return t.length===0?"":t.length<4?`(${t}`:t.length<7?`(${t.slice(0,3)}) ${t.slice(3)}`:`(${t.slice(0,3)}) ${t.slice(3,6)}-${t.slice(6,10)}`}function U(){let e=/^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;return g.required&&g.value.trim()===""?(h.textContent="Phone is required",h.style.display="block",g.classList.add("error"),!1):g.value.trim()!==""&&!e.test(g.value)?(h.textContent="Please enter a valid phone number",h.style.display="block",g.classList.add("error"),!1):(g.value=ae(g.value),h.textContent="",h.style.display="none",g.classList.remove("error"),!0)}g&&g.addEventListener("input",e=>{let t=e.target;t.value=ae(t.value),U()});var x=document.getElementById("dobInput"),P=document.getElementById("dobError");function pe(){return x.hasAttribute("required")&&x.value.trim()===""?(P.textContent="Date of Birth is required",P.style.display="block",x.classList.add("error"),!1):(P.textContent="",P.style.display="none",x.classList.remove("error"),!0)}x&&x.addEventListener("blur",pe);var M=document.getElementById("genderInput"),A=document.getElementById("genderError");function ye(){return M.hasAttribute("required")&&M.value.trim()===""?(A.textContent="Gender is required",A.style.display="block",M.classList.add("error"),!1):(A.textContent="",A.style.display="none",M.classList.remove("error"),!0)}M&&M.addEventListener("blur",ye);var H=document.getElementById("schoolInput"),q=document.getElementById("schoolError");function ge(){return H.hasAttribute("required")&&H.value.trim()===""?(q.textContent="School name is required",q.style.display="block",H.classList.add("error"),!1):(q.textContent="",q.style.display="none",H.classList.remove("error"),!0)}H&&H.addEventListener("blur",ge);var B=document.getElementById("gradeInput"),O=document.getElementById("gradeError");function Ee(){return B.hasAttribute("required")&&B.value.trim()==="N/A"?(O.textContent="Grade is required",O.style.display="block",B.classList.add("error"),!1):(O.textContent="",O.style.display="none",B.classList.remove("error"),!0)}B&&B.addEventListener("blur",Ee);var R=document.getElementById("ethnicityInput"),L=document.getElementById("ethnicityError");function fe(){return R.hasAttribute("required")&&R.value.trim()===""?(L.textContent="Ethnicity is required",L.style.display="block",R.classList.add("error"),!1):(L.textContent="",L.style.display="none",L.classList.remove("error"),!0)}L&&R.addEventListener("blur",fe);var D=document.getElementById("healthInput"),j=document.getElementById("healthError");function Ie(){return D.hasAttribute("required")&&D.value.trim()===""?(j.textContent="This field is required",j.style.display="block",D.classList.add("error"),!1):(j.textContent="",j.style.display="none",D.classList.remove("error"),!0)}D&&D.addEventListener("blur",Ie);var k=document.getElementById("emergencyContact"),J=document.getElementById("emergencyError");function he(){return k.hasAttribute("required")&&k.value.trim()===""?(J.textContent="This field is required",J.style.display="block",k.classList.add("error"),!1):(J.textContent="",J.style.display="none",k.classList.remove("error"),!0)}k&&k.addEventListener("blur",he);var S=document.getElementById("dismissal"),$=document.getElementById("dismissalError");function Te(){return S.hasAttribute("required")&&S.value.trim()===""?($.textContent="This field is required",$.style.display="block",S.classList.add("error"),!1):($.textContent="",$.style.display="none",S.classList.remove("error"),!0)}S&&S.addEventListener("blur",Te);var f=document.getElementById("additionalEmail"),T=document.getElementById("additionalEmailError");function Le(){let e=/^\S+@\S+\.\S+$/;return f.hasAttribute("required")&&f.value.trim()===""?(T.textContent="Email is required",T.style.display="block",f.classList.add("error"),!1):f.value.trim()!==""&&!e.test(f.value)?(T.textContent="Please enter a valid email",T.style.display="block",f.classList.add("error"),!1):(T.textContent="",T.style.display="none",f.classList.remove("error"),!0)}f&&f.addEventListener("blur",Le);var N=document.getElementById("interestInput"),G=document.getElementById("interestError");function ve(){return N.hasAttribute("required")&&N.value.trim()===""?(G.textContent="This field is required",G.style.display="block",N.classList.add("error"),!1):(G.textContent="",G.style.display="none",N.classList.remove("error"),!0)}N&&N.addEventListener("blur",ve);async function le(){let e=localStorage.getItem("profile"),t=e?JSON.parse(e):null,s=t?t.userID:null;if(!s)return;let c=document.getElementById("loadingAnimation"),n=document.getElementById("studentList"),r=document.getElementById("noStudents");try{c.style.display="block";let m=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${s}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(m.ok){let l=await m.json();if(l.allStudentProfiles.length>0){n.innerHTML="";let i=document.getElementById("studentCard");l.allStudentProfiles.forEach(o=>{let a=i.cloneNode(!0),d=a.querySelector("#studentNameList"),u=a.querySelector("#studentEmailList"),y=a.querySelector("#studentPhoneList"),p=a.querySelector("#studentImageList");d&&(d.textContent=o.firstName+" "+o.lastName),u&&(u.textContent=o.email),y&&(y.textContent=o.phone),p&&o.image&&(p.src=o.image.url),a.href=`/my-account/student-profile?profile=${o.airtableID}`,n.append(a)}),i.style.display="none",n.style.display="grid",r.style.display="none"}else n.style.display="none",r.style.display="flex"}else{let l=await m.json();alert(l.message||"An error occurred")}}catch(m){console.error(m)}finally{c.style.display="none"}}function ie(){let e=localStorage.getItem("profile");if(!e){console.error("Profile object not found in localStorage.");return}let t=JSON.parse(e),{airtableID:s}=t;if(!s){console.error("Airtable ID not found in profile.");return}let n=`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/Ticket_Orders?${new URLSearchParams({userAirtableID:s})}`;fetch(n,{method:"GET",headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>{if(!r.response||!r.response.result||!r.response.result.records){console.error("Unable to find ticket order records in the response.");return}let{records:m}=r.response.result,l=document.getElementById("ticketList");if(l)if(l.innerHTML="",m.length===0){let i=document.getElementById("noTickets");i&&(i.style.display="flex")}else{let i=document.getElementById("noTickets");i&&(i.style.display="none"),m.forEach(o=>{let a=document.createElement("a");a.href=`/tickets/ticket-order?order=${o.fields.orderNumber}`,a.setAttribute("data-w-id","6f59b974-64ae-1e7f-09cb-d5a59bc81f77"),a.className="student_card w-inline-block";let d=document.createElement("div");d.className="student_details",d.setAttribute("w-el","studentCard");let u=document.createElement("div");u.id="performanceName",u.className="heading-style-h6",u.textContent=o.fields.performanceName;let y=document.createElement("div");y.id="performanceDate",y.className="text-weight-light text-size-small",y.textContent=be(o.fields.performanceDate);let p=document.createElement("div");p.id="performanceTime",p.className="text-weight-light text-size-small",p.textContent=o.fields.performanceTime,d.appendChild(u),d.appendChild(y),d.appendChild(p),a.appendChild(d),l.appendChild(a)})}}).catch(r=>{console.error("Error:",r)})}function be(e){let t={year:"numeric",month:"long",day:"numeric",timeZone:"UTC"};return new Date(e).toLocaleDateString(void 0,t)}ne();var xe=document.querySelectorAll('.switch input[type="checkbox"]');xe.forEach(function(e){e.addEventListener("click",function(){let t=this.parentNode;t.classList.toggle("checked");let s=t.querySelector(".toggle-text");s&&(this.checked?s.textContent="Yes":s.textContent="No")}),e.click()});se().then(()=>{let e=document.querySelector("#yMember");e!=null&&e.checked?_("7rem"):_("0rem"),e==null||e.addEventListener("change",function(){this.checked?_("7rem"):_("0rem")})}).catch(e=>{console.error(e)});function _(e){let t=document.querySelector("#displayYInput");t&&(t.style.height=e)}var Me=document.getElementById("imageUpload");oe(Me);var de=document.getElementById("phoneInput");de&&de.addEventListener("input",U);var me=document.getElementById("firstNameInput");me&&me.addEventListener("input",F);var ce=document.getElementById("lastNameInput");ce&&ce.addEventListener("input",z);var ue=document.getElementById("emailInput");ue&&ue.addEventListener("input",Y);var He=document.getElementById("submitButton");He.addEventListener("click",e=>{if(U())e.preventDefault(),re();else{e.preventDefault();let t=document.getElementById("submitError");t.style.display="block",t.textContent="Please make sure you have entered all fields correctly."}});le();ie();})();