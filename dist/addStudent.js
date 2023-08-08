"use strict";(()=>{function ne(){let t=localStorage.getItem("authToken");return t?fetch("https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/me",{method:"GET",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()}).catch(e=>{console.error("Error:",e);let n=document.querySelector(".page-wrapper");n&&n.hasAttribute("gatedContent")&&(window.location.href="/login",localStorage.removeItem("authToken"),localStorage.removeItem("profile"),localStorage.removeItem("role"))}):(window.location.href="/login",Promise.reject())}async function se(){try{let t=await fetch("https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles",{method:"POST",headers:{"Content-Type":"application/json"}});if(t.ok){let e=await t.json();localStorage.setItem("studentID",e.id)}else{let e=await t.json(),n=document.getElementById("submitError");n&&(n.style.display="block",n.textContent=e.message||"An error occurred")}}catch(t){console.error(t)}finally{}}async function ae(){let t=localStorage.getItem("profile"),e=t?JSON.parse(t):null,n=e?e.userID:null;if(!n)return;let c=document.getElementById("loadingAnimation");try{c.style.display="block";let o=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles?guardianUserID=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(o.ok){let d=await o.json();if(d.allStudentProfiles.length>0){let l=document.getElementById("studentList"),s=document.getElementById("studentCard"),a=document.getElementById("studentListWrapper");d.allStudentProfiles.forEach(r=>{let p=s.cloneNode(!0),D=p.querySelector("#studentNameList"),C=p.querySelector("#studentEmailList"),S=p.querySelector("#studentPhoneList"),k=p.querySelector("#studentImageList");D&&(D.textContent=r.firstName+" "+r.lastName),C&&(C.textContent=r.email),S&&(S.textContent=r.phone),k&&r.image&&(k.src=r.image.url),l.append(p)}),s.style.display="none",l.style.display="block",setTimeout(()=>{a.style.width="28rem"},0)}}else{let d=await o.json();alert(d.message||"An error occurred")}}catch(o){console.error(o)}finally{c.style.display="none"}}async function re(){let t=localStorage.getItem("studentID"),e=localStorage.getItem("profile");if(!e||!t)return;let n=JSON.parse(e),{userID:c}=n,o=document.getElementById("loadingAnimation");o.style.display="block";let d={firstName:document.getElementById("firstNameInput").value,lastName:document.getElementById("lastNameInput").value,email:document.getElementById("emailInput").value,phone:document.getElementById("phoneInput").value,dob:document.getElementById("dobInput").value,gender:document.getElementById("genderInput").value,ethnicity:document.getElementById("ethnicityInput").value,health:document.getElementById("healthInput").value,additionalName:document.getElementById("additionalName").value,additionalEmail:document.getElementById("additionalEmail").value,additionalPhone:document.getElementById("additionalPhone").value,emergencyContact:document.getElementById("emergencyContact").value,dismissal:document.getElementById("dismissal").value,family:document.getElementById("family").value,grade:document.getElementById("gradeInput").value,school:document.getElementById("schoolInput").value,sendTexts:document.getElementById("sendTexts").checked,photoRelease:document.getElementById("photoRelease").checked,independentTravel:document.getElementById("independentTravel").checked,studentID:t,guardianUserID:c};try{let l=await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/student_profiles/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(l.ok){let s=await l.json(),a=document.getElementById("submitError");a.style.display="none";let r=document.getElementById("successMessage");r.style.display="flex";let p=document.getElementById("addStudentContainer");p.style.display="none",window.scrollTo(0,0);let D=document.getElementById("studentName");D.textContent=`${s.studentProfile.firstName} ${s.studentProfile.lastName}`;let C=document.getElementById("studentEmail");C.textContent=s.studentProfile.email;let S=document.getElementById("studentPhone");S.textContent=s.studentProfile.phone;let k=document.getElementById("studentImage");s.studentProfile.image&&s.studentProfile.image.url&&(k.src=s.studentProfile.image.url)}else{let s=await l.json(),a=document.getElementById("submitError");a&&(s.message==="Duplicate record detected. Please check your input and try again."?a.textContent="A user with that email already exists. If your student doesn\u2019t have their own email, please leave blank":a.textContent=s.message||"An error occurred",a.style.display="block",o.style.display="none")}}catch(l){console.error(l)}}function oe(t){t.addEventListener("change",async()=>{var l;let e=document.getElementById("profileImage"),n=document.getElementById("fileError"),c=document.getElementById("fileUploaded"),o=document.getElementById("loadingImageAnimation"),d=(l=t.files)==null?void 0:l[0];if(d){if(d.size>2*1024*1024){n.textContent="File size must be less than 2MB",n.style.display="block";return}let s=new FileReader;s.onload=async()=>{e.src=s.result,n.textContent="",n.style.display="none",o.style.display="flex";try{let a=localStorage.getItem("studentID"),r=await fetch("https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/studentImages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({studentID:a,studentImage:s.result})});if(r.ok)c.style.display="block";else throw new Error(`Error: ${r.status} ${r.statusText}`)}catch(a){n.textContent=a.message,n.style.display="block"}finally{o.style.display="none"}},s.readAsDataURL(d)}else e.src="https://assets.website-files.com/64404db37a2b832b7d5aa9f8/64404db37a2b831d465aaa01_image.svg",n.textContent="",n.style.display="none"})}var f=document.getElementById("firstNameInput"),N=document.getElementById("firstNameError");function G(){return f.hasAttribute("required")&&f.value.trim()===""?(N.textContent="First name required",N.style.display="block",f.classList.add("error"),!1):(N.textContent="",N.style.display="none",f.classList.remove("error"),!0)}f&&f.addEventListener("blur",G);var h=document.getElementById("lastNameInput"),w=document.getElementById("lastNameError");function F(){return h.hasAttribute("required")&&h.value.trim()===""?(w.textContent="Last name required",w.style.display="block",h.classList.add("error"),!1):(w.textContent="",w.style.display="none",h.classList.remove("error"),!0)}h&&h.addEventListener("blur",F);var u=document.getElementById("emailInput"),y=document.getElementById("emailError");function _(){let t=/^\S+@\S+\.\S+$/;return u.hasAttribute("required")&&u.value.trim()===""?(y.textContent="Email is required",y.style.display="block",u.classList.add("error"),!1):u.value.trim()!==""&&!t.test(u.value)?(y.textContent="Please enter a valid email",y.style.display="block",u.classList.add("error"),!1):(y.textContent="",y.style.display="none",u.classList.remove("error"),!0)}u&&u.addEventListener("blur",_);var i=document.getElementById("phoneInput"),E=document.getElementById("phoneError");function le(t){let e=t.replace(/\D/g,"");return e.length===0?"":e.length<4?`(${e}`:e.length<7?`(${e.slice(0,3)}) ${e.slice(3)}`:`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6,10)}`}function z(){let t=/^\D*(\d{3})\D*\D*(\d{3})\D*(\d{4})\D*$/;return i.required&&i.value.trim()===""?(E.textContent="Phone is required",E.style.display="block",i.classList.add("error"),!1):i.value.trim()!==""&&!t.test(i.value)?(E.textContent="Please enter a valid phone number",E.style.display="block",i.classList.add("error"),!1):(i.value=le(i.value),E.textContent="",E.style.display="none",i.classList.remove("error"),!0)}i&&i.addEventListener("input",t=>{let e=t.target;e.value=le(e.value),z()});var L=document.getElementById("dobInput"),q=document.getElementById("dobError");function W(){return L.hasAttribute("required")&&L.value.trim()===""?(q.textContent="Date of Birth is required",q.style.display="block",L.classList.add("error"),!1):(q.textContent="",q.style.display="none",L.classList.remove("error"),!0)}L&&L.addEventListener("blur",W);var v=document.getElementById("genderInput"),A=document.getElementById("genderError");function Q(){return v.hasAttribute("required")&&v.value.trim()===""?(A.textContent="Gender is required",A.style.display="block",v.classList.add("error"),!1):(A.textContent="",A.style.display="none",v.classList.remove("error"),!0)}v&&v.addEventListener("blur",Q);var T=document.getElementById("schoolInput"),P=document.getElementById("schoolError");function Y(){return T.hasAttribute("required")&&T.value.trim()===""?(P.textContent="School name is required",P.style.display="block",T.classList.add("error"),!1):(P.textContent="",P.style.display="none",T.classList.remove("error"),!0)}T&&T.addEventListener("blur",Y);var x=document.getElementById("gradeInput"),O=document.getElementById("gradeError");function K(){return x.hasAttribute("required")&&x.value.trim()==="N/A"?(O.textContent="Grade is required",O.style.display="block",x.classList.add("error"),!1):(O.textContent="",O.style.display="none",x.classList.remove("error"),!0)}x&&x.addEventListener("blur",K);var J=document.getElementById("ethnicityInput"),I=document.getElementById("ethnicityError");function V(){return J.hasAttribute("required")&&J.value.trim()===""?(I.textContent="Ethnicity is required",I.style.display="block",J.classList.add("error"),!1):(I.textContent="",I.style.display="none",I.classList.remove("error"),!0)}I&&J.addEventListener("blur",V);var B=document.getElementById("healthInput"),$=document.getElementById("healthError");function X(){return B.hasAttribute("required")&&B.value.trim()===""?($.textContent="This field is required",$.style.display="block",B.classList.add("error"),!1):($.textContent="",$.style.display="none",B.classList.remove("error"),!0)}B&&B.addEventListener("blur",X);var b=document.getElementById("emergencyContact"),j=document.getElementById("emergencyError");function Z(){return b.hasAttribute("required")&&b.value.trim()===""?(j.textContent="This field is required",j.style.display="block",b.classList.add("error"),!1):(j.textContent="",j.style.display="none",b.classList.remove("error"),!0)}b&&b.addEventListener("blur",Z);var M=document.getElementById("dismissal"),R=document.getElementById("dismissalError");function ee(){return M.hasAttribute("required")&&M.value.trim()===""?(R.textContent="This field is required",R.style.display="block",M.classList.add("error"),!1):(R.textContent="",R.style.display="none",M.classList.remove("error"),!0)}M&&M.addEventListener("blur",ee);var m=document.getElementById("additionalEmail"),g=document.getElementById("additionalEmailError");function te(){let t=/^\S+@\S+\.\S+$/;return m.hasAttribute("required")&&m.value.trim()===""?(g.textContent="Email is required",g.style.display="block",m.classList.add("error"),!1):m.value.trim()!==""&&!t.test(m.value)?(g.textContent="Please enter a valid email",g.style.display="block",m.classList.add("error"),!1):(g.textContent="",g.style.display="none",m.classList.remove("error"),!0)}m&&m.addEventListener("blur",te);var H=document.getElementById("interestInput"),U=document.getElementById("interestError");function be(){return H.hasAttribute("required")&&H.value.trim()===""?(U.textContent="This field is required",U.style.display="block",H.classList.add("error"),!1):(U.textContent="",U.style.display="none",H.classList.remove("error"),!0)}H&&H.addEventListener("blur",be);ne();ae();se();var Me=document.getElementById("imageUpload");oe(Me);var ie=document.getElementById("firstNameInput");ie&&ie.addEventListener("input",G);var de=document.getElementById("lastNameInput");de&&de.addEventListener("input",F);var ue=document.getElementById("emailInput");ue&&ue.addEventListener("input",_);var me=document.getElementById("phoneInput");me&&me.addEventListener("input",z);var ce=document.getElementById("dobInput");ce&&ce.addEventListener("input",W);var pe=document.getElementById("genderInput");pe&&pe.addEventListener("input",Q);var ye=document.getElementById("schoolInput");ye&&ye.addEventListener("input",Y);var Ee=document.getElementById("gradeInput");Ee&&Ee.addEventListener("input",K);var ge=document.getElementById("ethnicityInput");ge&&ge.addEventListener("input",V);var Ie=document.getElementById("healthInput");Ie&&Ie.addEventListener("input",X);var fe=document.getElementById("emergencyContact");fe&&fe.addEventListener("input",Z);var he=document.getElementById("dismissal");he&&he.addEventListener("input",ee);var Le=document.getElementById("additionalEmail");Le&&Le.addEventListener("input",te);var He=document.querySelectorAll('.switch input[type="checkbox"]');He.forEach(function(t){t.addEventListener("click",function(){let e=this.parentNode;e.classList.toggle("checked");let n=e.querySelector(".toggle-text");n&&(this.checked?n.textContent="Yes":n.textContent="No")})});var ve=document.getElementById("additionalCare"),Te=document.getElementById("additionalOverflow");ve.addEventListener("click",()=>{ve.checked?Te.style.height="32rem":Te.style.height="0"});var xe=document.getElementById("familyToggle"),Be=document.getElementById("familyOverflow");xe.addEventListener("click",()=>{xe.checked?Be.style.height="12rem":Be.style.height="0"});var De=document.getElementById("submitButton");De.addEventListener("click",t=>{if(!G()||!F()||!_()||!z()||!W()||!Q()||!Y()||!K()||!V()||!X()||!Z()||!ee()||!te){t.preventDefault();let e=document.getElementById("submitError");e.style.display="block",e.textContent="Please make sure you have entered all fields correctly."}else t.preventDefault(),re()});var Ce=document.getElementById("studentContinue");Ce.addEventListener("click",()=>{localStorage.getItem("redirectURL")&&JSON.parse(localStorage.getItem("profile")).phoneNumber?window.location.href=localStorage.getItem("redirectURL"):window.location.href="/create-account/account-details"});})();
