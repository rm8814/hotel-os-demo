/*! © 2026 PT Skala Estat Asia (UPSCALE). Written by Aninda Wida. All rights reserved. Proprietary and confidential. */
window.UPX_APPS = window.UPX_APPS || {};
window.UPX_APPS["guest-portal"] = function (DCLogic, React) {

class Component extends DCLogic {
  constructor(p) { super(p); let th = 'dark'; try { th = localStorage.getItem('upx_theme') === 'light' ? 'light' : 'dark'; } catch (e) {} this.state = {theme:th,step:'find',conf:'',last:'',err:'',b:null,phone:'',email:'',nat:'',adults:2,kids:0,photo:'',idState:'none',idType:'Passport',idName:'',idNo:'',idExp:'',eta:'14:00',trans:'Own arrangement',reqs:[],note:'',upg:false,ex:{},agree:false,signName:'',data:null,already:false}; }
  componentDidMount() { this.apply(); this.load(); try { const c = new URLSearchParams(location.search).get('c'); if (c) this.setState({conf:c}); } catch (e) {} this._t = setInterval(() => this.load(), 4000); }
  componentWillUnmount() { clearInterval(this._t); }
  apply() { try { document.documentElement.setAttribute('data-theme', this.state.theme); } catch (e) {} }
  componentDidUpdate() { this.apply(); }
  load() { try { const d = JSON.parse(localStorage.getItem('upx_portal_res') || 'null'); if (d && JSON.stringify(d) !== JSON.stringify(this.state.data)) this.setState({data:d}); } catch (e) {} }
  idr(n) { return 'Rp ' + Math.round(n).toLocaleString('en-US'); }
  norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g,''); }
  hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h,16777619); } return (h >>> 0); }
  renderVals() {
    const s = this.state, self = this, d = s.data || {hotel:'Grand Samudra Bali',ci:'14:00',co:'12:00',rows:[]}, b = s.b || {guest:'',type:'',from:'',to:'',nights:1,conf:'',offer:null};
    const set = k => e => self.setState({[k]:e.target.value,err:''}), go = step => self.setState({step,err:''}), fail = m => { self.setState({err:m}); return false; };
    const chip = on => 'border:1px solid ' + (on ? 'var(--accent-violet)' : 'var(--line)') + ';border-radius:999px;padding:10px 16px;font-size:14px;cursor:pointer;font-family:inherit;background:' + (on ? 'var(--violet-wash)' : 'transparent') + ';color:var(--fg-1)';
    const ORDER = ['details','id','arrive','extras','sign'], idx = ORDER.indexOf(s.step), first = String(b.guest).split(' ')[0];
    const exp = s.idExp ? Date.parse(s.idExp) : 0, expOk = exp > Date.now() + 183 * 864e5, nameOk = !!s.idName && this.norm(s.idName).includes(this.norm(String(b.guest).split(' ').slice(-1)[0])), numOk = String(s.idNo).replace(/\s/g,'').length >= 6;
    const checks = [[nameOk,'Name matches the booking'],[expOk,'Valid for at least six months from today'],[numOk,'ID number looks complete'],[!!s.photo,'Photo is clear and complete']].map(c => ({t:c[1],mark:c[0] ? '✓' : '!',bg:c[0] ? 'var(--positive-soft)' : 'rgba(255,178,63,.18)',fg:c[0] ? 'var(--positive)' : 'var(--warning)'}));
    const offer = b.offer ? {to:b.offer.to,price:this.idr(b.offer.price),total:this.idr(b.offer.price * b.nights),label:s.upg ? 'Upgrade added' : 'Add this upgrade',variant:s.upg ? 'ghost' : 'primary'} : null;
    const EX = [['bf','Daily breakfast','Terrace buffet, for two',180000 * b.nights],['tr','Airport transfer','One way, private car',350000],['lo','Late check-out until 15:00','Subject to availability',400000]];
    const sum = 'Your stay: ' + b.type + ', ' + b.from + ' to ' + b.to + '. Arrival around ' + s.eta + '. ID verified' + (s.upg && b.offer ? ' and upgraded to ' + b.offer.to : '') + '.';
    const o = {g:{hotel:d.hotel,ci:d.ci,co:d.co,b,first,plural:b.nights === 1 ? '' : 's',summary:sum,code:String(this.hash(b.conf) % 900000 + 100000),
      theme:() => self.setState({theme:s.theme === 'light' ? 'dark' : 'light'},() => { try { localStorage.setItem('upx_theme',self.state.theme); } catch (e) {} }),themeIcon:s.theme === 'light' ? '☾' : '☀',
      find:s.step === 'find',details:s.step === 'details',idStep:s.step === 'id',arrive:s.step === 'arrive',extrasStep:s.step === 'extras',sign:s.step === 'sign',done:s.step === 'done' && !s.already,already:s.step === 'done' && s.already,
      showBar:idx >= 0,barS:'display:block;height:100%;border-radius:999px;background:var(--accent-violet);width:' + Math.round(100 * (idx + 1) / 5) + '%',stepLabel:'Step ' + (idx + 1) + ' of 5',
      err:!!s.err,errText:s.err,conf:s.conf,last:s.last,onConf:set('conf'),onLast:set('last'),
      samples:d.rows.filter(r => !r.pre).slice(0,3).map(r => ({label:r.conf + ' · ' + r.last,pick:() => self.setState({conf:r.conf,last:r.last,err:''}),style:chip(false)})),hasSamples:d.rows.filter(r => !r.pre).length > 0,
      lookup:() => { const r = d.rows.find(x => this.norm(x.conf) === this.norm(s.conf) && this.norm(x.last) === this.norm(s.last)); if (!r) { fail('We could not find that booking. Check the confirmation number and last name, or ask the front desk.'); return; } self.setState({b:r,err:'',step:r.pre ? 'done' : 'details',already:!!r.pre,eta:r.eta || '14:00'}); },
      phone:s.phone,email:s.email,nat:s.nat,onPhone:set('phone'),onEmail:set('email'),onNat:set('nat'),adults:String(s.adults),kids:String(s.kids),adUp:() => self.setState(x => ({adults:Math.min(6,x.adults + 1)})),adDown:() => self.setState(x => ({adults:Math.max(1,x.adults - 1)})),kUp:() => self.setState(x => ({kids:Math.min(6,x.kids + 1)})),kDown:() => self.setState(x => ({kids:Math.max(0,x.kids - 1)})),
      photo:s.photo,hasPhoto:!!s.photo,noPhoto:!s.photo,isReal:!!s.photo && s.photo !== 'sample',isSample:s.photo === 'sample',reading:s.idState === 'reading',idDone:s.idState === 'done',canScan:s.idState !== 'reading',
      pickFile:() => { try { document.getElementById('idfile').click(); } catch (e) {} },
      onFile:e => { const f = e.target.files && e.target.files[0]; if (!f) return; self.setState({photo:URL.createObjectURL(f),idState:'reading',err:''}); setTimeout(() => self.extract(), 1300); },
      sample:() => { self.setState({photo:'sample',idState:'reading',err:''}); setTimeout(() => self.extract(), 1100); },
      idTypes:['Passport','KTP','KITAS'].map(t => ({label:t,pick:() => self.setState({idType:t}),style:chip(s.idType === t)})),idName:s.idName,idNo:s.idNo,idExp:s.idExp,onIdName:set('idName'),onIdNo:set('idNo'),onIdExp:set('idExp'),checks,
      etas:['Before 14:00','14:00','15:00','16:00','18:00','20:00','After 22:00'].map(t => ({label:t,pick:() => self.setState({eta:t}),style:chip(s.eta === t)})),
      trans:['Own arrangement','Hotel car from the airport','Taxi or ride-hailing'].map(t => ({label:t,pick:() => self.setState({trans:t}),style:chip(s.trans === t)})),
      reqs:['Early check-in','Late check-out','Baby cot','High floor','Quiet room','Extra pillows'].map(t => ({label:t,pick:() => self.setState(x => ({reqs:x.reqs.includes(t) ? x.reqs.filter(y => y !== t) : [...x.reqs,t]})),style:chip(s.reqs.includes(t))})),note:s.note,onNote:set('note'),
      hasOffer:!!offer,offer:offer || {},toggleUpg:() => self.setState(x => ({upg:!x.upg})),
      extras:EX.map(e => ({name:e[1],sub:e[2],price:this.idr(e[3]),toggle:() => self.setState(x => ({ex:{...x.ex,[e[0]]:!x.ex[e[0]]}})),bc:s.ex[e[0]] ? 'var(--accent-violet)' : 'var(--line)',bg:s.ex[e[0]] ? 'var(--violet-wash)' : 'transparent'})),
      agree:s.agree,toggleAgree:() => self.setState(x => ({agree:!x.agree,err:''})),signName:s.signName,onSign:set('signName'),
      back:() => go(ORDER[Math.max(0,idx - 1)]),
      next:() => { if (s.step === 'details') { if (!/^[+\d][\d\s-]{6,}$/.test(s.phone.trim())) return fail('Add a mobile number we can reach you on.'); if (!/^\S+@\S+\.\S+$/.test(s.email.trim())) return fail('Add a valid email address.'); if (!s.nat.trim()) return fail('Add your nationality.'); }
        if (s.step === 'id') { if (s.idState !== 'done') return fail('Take a photo of your ID first.'); if (!nameOk) return fail('The name on the ID must match the booking. Edit it if the scan misread it, or contact the front desk.'); if (!numOk) return fail('Check the ID number.'); if (!expOk) return fail('Your ID must be valid for at least six months from today.'); }
        go(ORDER[idx + 1]); },
      finish:() => { if (!s.agree) return fail('Accept the registration terms to continue.'); if (this.norm(s.signName) !== this.norm(b.guest)) return fail('Type your full name exactly as on the booking to sign.');
        try { const arr = JSON.parse(localStorage.getItem('upx_portal_in') || '[]'); arr.push({id:'pi' + Date.now(),resId:b.id,conf:b.conf,eta:s.eta,transport:s.trans,reqs:s.reqs,note:s.note,phone:s.phone,email:s.email,nationality:s.nat,adults:s.adults,kids:s.kids,id1:{type:s.idType,number:s.idNo,expiry:s.idExp,name:s.idName},signed:s.signName,upgrade:s.upg && b.offer ? {to:b.offer.to,price:b.offer.price} : null,extras:EX.filter(e => s.ex[e[0]]).map(e => ({k:e[0],name:e[1],price:e[3]})),at:new Date().toISOString()}); localStorage.setItem('upx_portal_in',JSON.stringify(arr)); } catch (e) {}
        self.setState({step:'done',err:''}); }}};
    return o;
  }
  extract() { const b = this.state.b || {}, t = this.state.idType, h = this.hash(String(b.conf)), pad = (n,l) => String(n).padStart(l,'0'), no = t === 'Passport' ? String.fromCharCode(65 + h % 26) + pad(h % 10000000,7) : pad(h,10) + pad(h % 1000000,6);
    this.setState({idState:'done',idName:b.guest || '',idNo:no,idExp:'2031-' + pad(h % 12 + 1,2) + '-' + pad(h % 27 + 1,2)}); }
}

return Component;
};
