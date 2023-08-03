"use strict";(()=>{function ne(){let t=localStorage.getItem("authToken");return fetch("https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/me",{method:"GET",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()}).catch(e=>{console.error("Error:",e);let n=document.querySelector(".page-wrapper");n&&n.hasAttribute("gatedContent")?(window.location.href="/login",localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role")):(localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role"))})}async function se(){try{let t=await fetch("https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles",{method:"POST",headers:{"Content-Type":"application/json"}});if(t.ok){let e=await t.json();localStorage.setItem("studentID",e.id)}else{let e=await t.json(),n=document.getElementById("submitError");n&&(n.style.display="block",n.textContent=e.message||"An error occurred")}}catch(t){console.error(t)}finally{}}async function oe(){let t=localStorage.getItem("profile"),e=t?JSON.parse(t):null,n=e?e.userID:null;if(!n)return;let c=document.getElementById("loadingAnimation");try{c.style.display="block";let l=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(l.ok){let d=await l.json();if(d.allStudentProfiles.length>0){let r=document.getElementById("studentList"),s=document.getElementById("studentCard"),o=document.getElementById("studentListWrapper");d.allStudentProfiles.forEach(a=>{let p=s.cloneNode(!0),D=p.querySelector("#studentNameList"),S=p.querySelector("#studentEmailList"),C=p.querySelector("#studentPhoneList"),k=p.querySelector("#studentImageList");D&&(D.textContent=a.firstName+" "+a.lastName),S&&(S.textContent=a.email),C&&(C.textContent=a.phone),k&&a.image&&(k.src=a.image.url),r.append(p)}),s.style.display="none",r.style.display="block",setTimeout(()=>{o.style.width="28rem"},0)}}else{let d=await l.json();alert(d.message||"An error occurred")}}catch(l){console.error(l)}finally{c.style.display="none"}}async function ae(){let t=localStorage.getItem("studentID"),e=localStorage.getItem("profile");if(!e||!t)return;let n=JSON.parse(e),{userID:c}=n,l=document.getElementById("loadingAnimation");l.style.display="block";let d={firstName:document.getElementById("firstNameInput").value,lastName:document.getElementById("lastNameInput").value,email:document.getElementById("emailInput").value,phone:document.getElementById("phoneInput").value,dob:document.getElementById("dobInput").value,gender:document.getElementById("genderInput").value,ethnicity:document.getElementById("ethnicityInput").value,health:document.getElementById("healthInput").value,additionalName:document.getElementById("additionalName").value,additionalEmail:document.getElementById("additionalEmail").value,additionalPhone:document.getElementById("additionalPhone").value,emergencyContact:document.getElementById("emergencyContact").value,dismissal:document.getElementById("dismissal").value,family:document.getElementById("family").value,grade:document.getElementById("gradeInput").value,school:document.getElementById("schoolInput").value,sendTexts:document.getElementById("sendTexts").checked,photoRelease:document.getElementById("photoRelease").checked,independentTravel:document.getElementById("independentTravel").checked,studentID:t,guardianUserID:c};try{let r=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(r.ok){let s=await r.json(),o=document.getElementById("submitError");o.style.display="none";let a=document.getElementById("successMessage");a.style.display="flex";let p=document.getElementById("addStudentContainer");p.style.display="none",window.scrollTo(0,0);let D=document.getElementById("studentName");D.textContent=`${s.studentProfile.firstName} ${s.studentProfile.lastName}`;let S=document.getElementById("studentEmail");S.textContent=s.studentProfile.email;let C=document.getElementById("studentPhone");C.textContent=s.studentProfile.phone;let k=document.getElementById("studentImage");s.studentProfile.image&&s.studentProfile.image.url&&(k.src=s.studentProfile.image.url)}else{let s=await r.json(),o=document.getElementById("submitError");o&&(s.message==="Duplicate record detected. Please check your input and try again."?o.textContent="A user with that email already exists. If your student doesn\u2019t have their own email, please leave blank":o.textContent=s.message||"An error occurred",o.style.display="block",l.style.display="none")}}catch(r){console.error(r)}}function le(t){t.addEventListener("change",async()=>{var r;let e=document.getElementById("profileImage"),n=document.getElementById("fileError"),c=document.getElementById("fileUploaded"),l=document.getElementById("loadingImageAnimation"),d=(r=t.files)==null?void 0:r[0];if(d){if(d.size>2*1024*1024){n.textContent="File size must be less than 2MB",n.style.display="block";return}let s=new FileReader;s.onload=async()=>{e.src=s.result,n.textContent="",n.style.display="none",l.style.display="flex";try{let o=localStorage.getItem("studentID"),a=await fetch("https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/studentImages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({studentID:o,studentImage:s.result})});if(a.ok)c.style.display="block";else throw new Error(`Error: ${a.status} ${a.statusText}`)}catch(o){n.textContent=o.message,n.style.display="block"}finally{l.style.display="none"}},s.readAsDataURL(d)}else e.src="https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg",n.textContent="",n.style.display="none"})}var f=document.getElementById("firstNameInput"),w=document.getElementById("firstNameError");function U(){return f.hasAttribute("required")&&f.value.trim()===""?(w.textContent="First name required",w.style.display="block",f.classList.add("error"),!1):(w.textContent="",w.style.display="none",f.classList.remove("error"),!0)}f&&f.addEventListener("blur",U);var h=document.getElementById("lastNameInput"),N=document.getElementById("lastNameError");function F(){return h.hasAttribute("required")&&h.value.trim()===""?(N.textContent="Last name required",N.style.display="block",h.classList.add("error"),!1):(N.textContent="",N.style.display="none",h.classList.remove("error"),!0)}h&&h.addEventListener("blur",F);var m=document.getElementById("emailInput"),y=document.getElementById("emailError");function _(){let t=/^\S+@\S+\.\S+$/;return m.hasAttribute("required")&&m.value.trim()===""?(y.textContent="Email is required",y.style.display="block",m.classList.add("error"),!1):m.value.trim()!==""&&!t.test(m.value)?(y.textContent="Please enter a valid email",y.style.display="block",m.classList.add("error"),!1):(y.textContent="",y.style.display="none",m.classList.remove("error"),!0)}m&&m.addEventListener("blur",_);var i=document.getElementById("phoneInput"),E=document.getElementById("phoneError");function re(t){let e=t.replace(/\D/g,"");return e.length===0?"":e.length<4?`(${e}`:e.length<7?`(${e.slice(0,3)}) ${e.slice(3)}`:`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6,10)}`}function z(){let t=/^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;return i.required&&i.value.trim()===""?(E.textContent="Phone is required",E.style.display="block",i.classList.add("error"),!1):i.value.trim()!==""&&!t.test(i.value)?(E.textContent="Please enter a valid phone number",E.style.display="block",i.classList.add("error"),!1):(i.value=re(i.value),E.textContent="",E.style.display="none",i.classList.remove("error"),!0)}i&&i.addEventListener("input",t=>{let e=t.target;e.value=re(e.value),z()});var L=document.getElementById("dobInput"),q=document.getElementById("dobError");function W(){return L.hasAttribute("required")&&L.value.trim()===""?(q.textContent="Date of Birth is required",q.style.display="block",L.classList.add("error"),!1):(q.textContent="",q.style.display="none",L.classList.remove("error"),!0)}L&&L.addEventListener("blur",W);var v=document.getElementById("genderInput"),A=document.getElementById("genderError");function Q(){return v.hasAttribute("required")&&v.value.trim()===""?(A.textContent="Gender is required",A.style.display="block",v.classList.add("error"),!1):(A.textContent="",A.style.display="none",v.classList.remove("error"),!0)}v&&v.addEventListener("blur",Q);var T=document.getElementById("schoolInput"),P=document.getElementById("schoolError");function Y(){return T.hasAttribute("required")&&T.value.trim()===""?(P.textContent="School name is required",P.style.display="block",T.classList.add("error"),!1):(P.textContent="",P.style.display="none",T.classList.remove("error"),!0)}T&&T.addEventListener("blur",Y);var x=document.getElementById("gradeInput"),O=document.getElementById("gradeError");function K(){return x.hasAttribute("required")&&x.value.trim()==="N/A"?(O.textContent="Grade is required",O.style.display="block",x.classList.add("error"),!1):(O.textContent="",O.style.display="none",x.classList.remove("error"),!0)}x&&x.addEventListener("blur",K);var G=document.getElementById("ethnicityInput"),I=document.getElementById("ethnicityError");function V(){return G.hasAttribute("required")&&G.value.trim()===""?(I.textContent="Ethnicity is required",I.style.display="block",G.classList.add("error"),!1):(I.textContent="",I.style.display="none",I.classList.remove("error"),!0)}I&&G.addEventListener("blur",V);var B=document.getElementById("healthInput"),j=document.getElementById("healthError");function X(){return B.hasAttribute("required")&&B.value.trim()===""?(j.textContent="This field is required",j.style.display="block",B.classList.add("error"),!1):(j.textContent="",j.style.display="none",B.classList.remove("error"),!0)}B&&B.addEventListener("blur",X);var b=document.getElementById("emergencyContact"),$=document.getElementById("emergencyError");function Z(){return b.hasAttribute("required")&&b.value.trim()===""?($.textContent="This field is required",$.style.display="block",b.classList.add("error"),!1):($.textContent="",$.style.display="none",b.classList.remove("error"),!0)}b&&b.addEventListener("blur",Z);var M=document.getElementById("dismissal"),J=document.getElementById("dismissalError");function ee(){return M.hasAttribute("required")&&M.value.trim()===""?(J.textContent="This field is required",J.style.display="block",M.classList.add("error"),!1):(J.textContent="",J.style.display="none",M.classList.remove("error"),!0)}M&&M.addEventListener("blur",ee);var u=document.getElementById("additionalEmail"),g=document.getElementById("additionalEmailError");function te(){let t=/^\S+@\S+\.\S+$/;return u.hasAttribute("required")&&u.value.trim()===""?(g.textContent="Email is required",g.style.display="block",u.classList.add("error"),!1):u.value.trim()!==""&&!t.test(u.value)?(g.textContent="Please enter a valid email",g.style.display="block",u.classList.add("error"),!1):(g.textContent="",g.style.display="none",u.classList.remove("error"),!0)}u&&u.addEventListener("blur",te);var H=document.getElementById("interestInput"),R=document.getElementById("interestError");function be(){return H.hasAttribute("required")&&H.value.trim()===""?(R.textContent="This field is required",R.style.display="block",H.classList.add("error"),!1):(R.textContent="",R.style.display="none",H.classList.remove("error"),!0)}H&&H.addEventListener("blur",be);ne();oe();se();var Me=document.getElementById("imageUpload");le(Me);var ie=document.getElementById("firstNameInput");ie&&ie.addEventListener("input",U);var de=document.getElementById("lastNameInput");de&&de.addEventListener("input",F);var me=document.getElementById("emailInput");me&&me.addEventListener("input",_);var ue=document.getElementById("phoneInput");ue&&ue.addEventListener("input",z);var ce=document.getElementById("dobInput");ce&&ce.addEventListener("input",W);var pe=document.getElementById("genderInput");pe&&pe.addEventListener("input",Q);var ye=document.getElementById("schoolInput");ye&&ye.addEventListener("input",Y);var Ee=document.getElementById("gradeInput");Ee&&Ee.addEventListener("input",K);var ge=document.getElementById("ethnicityInput");ge&&ge.addEventListener("input",V);var Ie=document.getElementById("healthInput");Ie&&Ie.addEventListener("input",X);var fe=document.getElementById("emergencyContact");fe&&fe.addEventListener("input",Z);var he=document.getElementById("dismissal");he&&he.addEventListener("input",ee);var Le=document.getElementById("additionalEmail");Le&&Le.addEventListener("input",te);var He=document.querySelectorAll('.switch input[type="checkbox"]');He.forEach(function(t){t.addEventListener("click",function(){let e=this.parentNode;e.classList.toggle("checked");let n=e.querySelector(".toggle-text");n&&(this.checked?n.textContent="Yes":n.textContent="No")})});var ve=document.getElementById("additionalCare"),Te=document.getElementById("additionalOverflow");ve.addEventListener("click",()=>{ve.checked?Te.style.height="32rem":Te.style.height="0"});var xe=document.getElementById("familyToggle"),Be=document.getElementById("familyOverflow");xe.addEventListener("click",()=>{xe.checked?Be.style.height="12rem":Be.style.height="0"});var De=document.getElementById("submitButton");De.addEventListener("click",t=>{if(!U()||!F()||!_()||!z()||!W()||!Q()||!Y()||!K()||!V()||!X()||!Z()||!ee()||!te){t.preventDefault();let e=document.getElementById("submitError");e.style.display="block",e.textContent="Please make sure you have entered all fields correctly."}else t.preventDefault(),ae()});})();
