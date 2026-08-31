// script.js — handles button actions, UPI intent, and copy-to-clipboard
document.addEventListener('DOMContentLoaded', function(){
  const instagramUrl = 'https://www.instagram.com/vmm_1980?igsi=MXJyd2s4bWEzOGljNA==';
  const locationUrl = 'https://goo.gl/maps/pdQANuvVoE4U4Vdz9';
  const upiId = 'aru.appu87@ybl';
  const upiIntent = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('Vinayaka Mitra Mandali')}&tn=${encodeURIComponent('Donation')}&cu=INR`;

  const btnInsta = document.getElementById('instagram');
  const btnLoc = document.getElementById('location');
  const btnDonate = document.getElementById('donate');
  const upiPanel = document.getElementById('upiPanel');
  const upiIdEl = document.getElementById('upiId');
  const copyBtn = document.getElementById('copyUpi');
  const upiIntentLink = document.getElementById('upiIntentLink');
  const toast = document.getElementById('toast');

  btnInsta.addEventListener('click', ()=> window.open(instagramUrl,'_blank','noopener'));
  btnLoc.addEventListener('click', ()=> window.open(locationUrl,'_blank','noopener'));

  btnDonate.addEventListener('click', ()=>{
    upiIntentLink.href = upiIntent;
    upiIdEl.textContent = upiId;
    upiPanel.style.display = 'block';

    // Try to open UPI intent. On many mobile browsers this will open the installed UPI app.
    // We set a short timeout and then restore focus so desktop browsers don't get stuck.
    try{
      window.location.href = upiIntent;
    }catch(e){
      // ignore
    }
  });

  copyBtn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(upiId);
      showToast('UPI ID copied to clipboard');
    }catch(e){
      // fallback
      const ta = document.createElement('textarea');
      ta.value = upiId;
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); showToast('UPI ID copied to clipboard'); }catch(e2){ showToast('Copy failed — please select and copy the UPI ID manually'); }
      ta.remove();
    }
  });

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2500);
  }

});
