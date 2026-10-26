/*! © 2026 PT Skala Estat Asia (UPSCALE). Written by Aninda Wida. All rights reserved. Proprietary and confidential. */
window.UPX_APPS = window.UPX_APPS || {};
window.UPX_APPS["tablet"] = function (DCLogic, React) {

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.TYPES = {'Deluxe King':['101','102','103','104','105','106','107','108','109','110','111'],'Deluxe Twin':['201','202','203','204','205','206','207','208','209'],'Suite':['301','302','303'],'Pool Villa':['V1','V2']};
    this.HKC = {'Vacant Dirty':'var(--room-vacant-dirty)','Vacant Clean':'var(--room-vacant-clean)','Inspected':'var(--room-inspected)','Occupied':'var(--room-occupied)','OOO':'var(--room-ooo)'};
    this.HKW = {'Vacant Dirty':'var(--room-vacant-dirty-w)','Vacant Clean':'var(--room-vacant-clean-w)','Inspected':'var(--room-inspected-w)','Occupied':'var(--room-occupied-w)','OOO':'var(--room-ooo-w)'};
    this.state = {theme:(() => { try { return localStorage.getItem('upx_theme') === 'light' ? 'light' : 'dark'; } catch (e) { return 'dark'; } })(),hlp:false,mode:'front', hkF:'All', pays:[{t:'07:41',g:'Hans Becker · 202',m:'Cash',a:330000,live:true},{t:'09:12',g:'Sarah Whitfield · 102',m:'Card',a:700000,live:true},{t:'10:05',g:'Tanaka Kenji · 103',m:'QRIS',a:190000,live:true}], csFolio:'h1', csMethod:'Cash', csAmt:'', seg:'arrivals', sel:'a1', q:'', toast:null, steps:{},
      hk:{'101':'Vacant Clean','102':'Occupied','103':'Occupied','104':'Vacant Dirty','105':'Inspected','201':'Vacant Clean','202':'Occupied','203':'Vacant Dirty','204':'Occupied','301':'Occupied','302':'Vacant Dirty','303':'OOO','V1':'Inspected','V2':'Occupied','106':'Vacant Clean','107':'Occupied','108':'Occupied','109':'Vacant Clean','110':'Inspected','111':'Occupied','205':'Vacant Clean','206':'Occupied','207':'Vacant Clean','208':'Occupied','209':'Vacant Clean'},
      g:[
        {id:'a1',kind:'arr',guest:'Wirawan Hadi',room:'101',type:'Deluxe King',ch:'Direct',eta:'13:30',n:3,rate:320000,pre:true,paid:true,checked:false},
        {id:'a2',kind:'arr',guest:'Dewi Lestari',room:'201',type:'Deluxe Twin',ch:'Traveloka',eta:'14:00',n:2,rate:340000,pre:false,paid:false,checked:false},
        {id:'a3',kind:'arr',guest:'James Okafor',room:'302',type:'Suite',ch:'Agoda',eta:'15:30',n:4,rate:520000,pre:false,paid:false,checked:false},
        {id:'a4',kind:'arr',guest:'Budi Santoso',room:null,type:'Deluxe Twin',ch:'Direct',eta:'16:00',n:2,rate:340000,pre:false,paid:false,checked:false},
        {id:'h1',kind:'in',guest:'Sarah Whitfield',room:'102',type:'Deluxe King',ch:'Booking.com',n:4,rate:335000,bal:0,out:'Fri 11 Sep'},
        {id:'h2',kind:'in',guest:'Tanaka Kenji',room:'103',type:'Deluxe King',ch:'Agoda',n:3,rate:320000,bal:0,out:'Thu 10 Sep'},
        {id:'h3',kind:'in',guest:'Hans Becker',room:'202',type:'Deluxe Twin',ch:'Direct',n:5,rate:340000,bal:254100,out:'Fri 11 Sep'},
        {id:'h4',kind:'in',guest:'Elena Petrova',room:'301',type:'Suite',ch:'Direct',n:6,rate:520000,bal:786500,out:'Sat 12 Sep'},
        {id:'h5',kind:'in',guest:'Ayumi Sato',room:'V2',type:'Pool Villa',ch:'Expedia',n:5,rate:780000,bal:0,out:'Wed 9 Sep'},
        {id:'d1',kind:'dep',guest:'Rahmat Hidayat',room:'204',type:'Deluxe Twin',ch:'Direct',n:1,rate:340000,bal:0,out:'Today 12:00'}]};
  }
  componentDidMount() { window.__tabletMode = m => this.setState({mode:m}); }
  componentWillUnmount() { delete window.__tabletMode; }
  idr(n) { return 'Rp ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  toast(t) { this.setState({toast:t}); clearTimeout(this._t); this._t = setTimeout(() => this.setState({toast:null}), 2800); }
  upd(id, patch) { this.setState(s => ({g:s.g.map(x => x.id === id ? {...x,...patch} : x)})); }
  isReady(r) { return r && ['Vacant Clean','Inspected'].includes(this.state.hk[r]); }
  suggest(a) { const s = this.state, taken = s.g.filter(x => x.room).map(x => x.room); return this.TYPES[a.type].find(r => !taken.includes(r) && s.hk[r] !== 'OOO' && s.hk[r] !== 'Occupied'); }
  renderVals() {
    const s = this.state, self = this, idr = n => this.idr(n);
    const seg = s.seg, kindOf = {arrivals:'arr',inhouse:'in',departures:'dep'}[seg], q = s.q.trim().toLowerCase();
    const cnt = k => s.g.filter(x => x.kind === k && !(k === 'arr' && x.checked)).length;
    const list = s.g.filter(x => x.kind === kindOf && !(x.kind === 'arr' && x.checked) && (!q || x.guest.toLowerCase().includes(q) || (x.room || '').toLowerCase().includes(q)));
    const sel = s.g.find(x => x.id === s.sel);
    const chip = on => 'flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid ' + (on ? 'var(--accent-violet)' : 'var(--line)') + ';border-radius:999px;padding:8px 6px;font-size:12.5px;font-weight:500;cursor:pointer;color:' + (on ? 'var(--fg-1)' : 'var(--fg-2)') + ';background:' + (on ? 'var(--accent-violet)' : 'transparent');
    const segs = [['arrivals','Arrivals','arr'],['inhouse','In-house','in'],['departures','Departures','dep']].map(x => ({label:x[1],n:cnt(x[2]),pick:() => self.setState({seg:x[0],sel:(s.g.find(y => y.kind === x[2] && !(y.kind === 'arr' && y.checked)) || {}).id || null}),style:chip(seg === x[0])}));
    const rows = list.map(x => { const rm = x.room || (x.kind === 'arr' ? this.suggest(x) : null), ready = x.kind !== 'arr' || this.isReady(rm);
      return {guest:x.guest,sub:x.type + (x.eta ? ' · ' + x.eta : x.out ? ' · out ' + x.out : '') + ' · ' + x.ch,room:x.room || (rm ? rm + '?' : 'None'),
        state:x.kind === 'arr' ? (x.pre ? 'Pre-checked' : ready ? 'Room ready' : 'Room not ready') : x.bal ? 'Balance due' : 'Settled',stateColor:'color:' + (x.kind === 'arr' ? (x.pre || ready ? 'var(--accent-cyan)' : 'var(--warning)') : x.bal ? 'var(--warning)' : 'var(--fg-3)'),
        pick:() => self.setState({sel:x.id}),style:'display:flex;align-items:center;gap:10px;width:100%;padding:13px 14px;border-radius:var(--r-lg);cursor:pointer;color:var(--fg-1);background:' + (s.sel === x.id ? 'var(--violet-wash-hi)' : 'var(--bg-elevated)') + ';border:1px solid ' + (s.sel === x.id ? 'var(--accent-violet)' : 'var(--line)')}; });
    // detail
    let d = {has:false,none:true};
    if (sel && list.some(x => x.id === sel.id)) {
      const isArr = sel.kind === 'arr', rm = sel.room || (isArr ? this.suggest(sel) : null), ready = this.isReady(rm);
      const stp = s.steps[sel.id] || {}, st = {id:sel.pre || !!stp.id,room:!!sel.room || !!stp.room,pay:sel.paid || sel.pre || !!stp.pay};
      const all = st.id && st.room && st.pay, done = [st.id,st.room,st.pay].filter(Boolean).length, fin = sel.room || rm;
      const dot = v => 'width:26px;height:26px;border-radius:999px;flex:none;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;' + (v ? 'background:var(--accent-cyan);color:#061020' : 'border:1px solid var(--line-strong);color:var(--fg-3)');
      const set = k => () => self.setState(x => ({steps:{...x.steps,[sel.id]:{...(x.steps[sel.id] || {}),[k]:true}}}));
      const tot = sel.rate * sel.n * 1.21, bal = isArr ? (sel.paid || sel.pre ? 0 : tot) : sel.bal;
      d = {has:true,none:false,eyebrow:isArr ? 'Arrival · ETA ' + sel.eta : sel.kind === 'in' ? 'In-house · out ' + sel.out : 'Departure · ' + sel.out,guest:sel.guest,sub:sel.type + ' · ' + sel.ch + ' · ' + sel.n + (sel.n === 1 ? ' night' : ' nights'),
        tone:isArr ? (sel.pre ? 'positive' : 'brand') : sel.bal ? 'warning' : 'neutral',pill:isArr ? (sel.pre ? 'Pre-checked' : 'Arriving') : sel.bal ? 'Balance due' : 'Settled',
        facts:[{k:'Room',v:(sel.room || fin || 'None')},{k:'Rate / night',v:idr(sel.rate)},{k:'Total incl. tax',v:idr(tot)}],
        checkin:isArr,pre:sel.pre,stepsDone:done + ' of 3',
        steps:[{label:'Verify ID',note:st.id ? (sel.pre ? 'Passport scanned online' : 'Passport scanned') : 'Scan passport or KTP',done:st.id,btn:st.id ? 'Verified' : 'Scan ID',dot:dot(st.id),mark:st.id ? '✓' : '1',run:set('id')},
          {label:'Assign room',note:sel.room ? 'Room ' + sel.room + (ready ? ' · ready' : ' · still being cleaned') : fin ? 'Suggested ' + fin + (ready ? ' · ready' : ' · being cleaned') : 'No room free',done:!!sel.room,btn:sel.room ? 'Assigned' : fin ? 'Assign ' + fin : 'None',dot:dot(!!sel.room),mark:sel.room ? '✓' : '2',run:() => { if (fin) { self.upd(sel.id,{room:fin}); self.toast(sel.guest + ' assigned to ' + fin); } }},
          {label:'Payment',note:st.pay ? (sel.pre ? 'Card on file' : 'Deposit taken') : 'Deposit ' + idr(sel.rate),done:st.pay,btn:st.pay ? 'Done' : 'Take deposit',dot:dot(st.pay),mark:st.pay ? '✓' : '3',run:set('pay')}],
        ctaOff:!(all && this.isReady(fin)),ctaLabel:all ? (this.isReady(fin) ? 'Check in and encode key' : 'Room ' + fin + ' not ready') : 'Complete steps to check in',
        folio:[{k:'Room · ' + sel.n + ' × ' + idr(sel.rate),v:idr(sel.rate * sel.n)},{k:'Tax and service 21%',v:idr(sel.rate * sel.n * 0.21)},{k:'Paid',v:'− ' + idr(tot - bal)}],balance:idr(bal),
        canPay:!isArr && sel.bal > 0,canOut:sel.kind !== 'arr',outOff:sel.bal > 0};
    }
    // map
    const occ = {}; s.g.forEach(x => { if (x.room && !(x.kind === 'arr' && !x.checked && false)) occ[x.room] = x; });
    const needRoom = sel && sel.kind === 'arr' && !sel.room;
    const groups = Object.keys(this.TYPES).map(t => ({type:t,rooms:this.TYPES[t].map(no => { const hk = s.hk[no], o = occ[no], tappable = needRoom && sel.type === t && this.isReady(no) && !o, mine = sel && sel.room === no;
      return {no,sub:o ? o.guest.split(' ')[0] : hk === 'OOO' ? 'Out of order' : hk.replace('Vacant ',''),tap:() => { if (tappable) { self.upd(sel.id,{room:no}); self.toast(sel.guest + ' assigned to ' + no); } },
        style:'display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:9px 10px;border-radius:var(--r-md);cursor:' + (tappable ? 'pointer' : 'default') + ';color:var(--fg-1);min-width:0;background:' + this.HKW[hk] + ';border:1px solid ' + this.HKC[hk] + ';' + (mine ? 'box-shadow:0 0 0 2px var(--fg-1);' : tappable ? 'box-shadow:0 0 0 2px var(--accent-violet);' : '')}; })}));
    const doCheckIn = () => { if (!sel) return; const fin = sel.room || this.suggest(sel); self.upd(sel.id,{checked:true,room:fin}); self.setState(x => ({hk:{...x.hk,[fin]:'Occupied'},sel:(x.g.find(y => y.kind === 'arr' && !y.checked && y.id !== sel.id) || {}).id || null})); self.toast(sel.guest + ' checked in · room ' + fin + ' · key encoded'); };
    const md = s.mode;
    const HKN = {'Vacant Dirty':'Vacant Clean','Vacant Clean':'Inspected'}, HKADV = {'Vacant Dirty':'Clean','Vacant Clean':'Inspect'};
    const arrRooms = s.g.filter(x => x.kind === 'arr' && !x.checked && x.room).map(x => x.room);
    const allRooms = Object.entries(this.TYPES).flatMap(([t,rs]) => rs.map(no => ({no,t})));
    const hkOrder = ['Vacant Dirty','Vacant Clean','Inspected','Occupied','OOO'];
    const hkChip = on => 'border:1px solid ' + (on ? 'var(--accent-violet)' : 'var(--line)') + ';border-radius:999px;padding:7px 12px;font-size:12.5px;cursor:pointer;color:' + (on ? 'var(--fg-1)' : 'var(--fg-2)') + ';background:' + (on ? 'var(--violet-wash)' : 'transparent');
    const readyN = arrRooms.filter(r => ['Vacant Clean','Inspected'].includes(s.hk[r])).length;
    const hkT = {ready:readyN + ' / ' + arrRooms.length,bar:'height:100%;width:' + (arrRooms.length ? Math.round(100 * readyN / arrRooms.length) : 0) + '%;background:var(--accent-cyan)',
      filters:['All',...hkOrder].map(k => ({label:k,pick:() => self.setState({hkF:k}),style:hkChip(s.hkF === k)})),
      groups:hkOrder.filter(k => s.hkF === 'All' || s.hkF === k).map(k => { const rooms = allRooms.filter(r => s.hk[r.no] === k); return {label:k,n:rooms.length,rooms:rooms.map(r => { const pri = arrRooms.includes(r.no), occ = s.g.find(x => x.kind !== 'arr' && x.room === r.no); return {no:r.no,type:r.t,st:k,note:k === 'Occupied' && occ ? occ.guest + (occ.kind === 'dep' ? ' · departing' : '') : k === 'OOO' ? 'Ticket #482 · AC' : pri ? 'Arrival today' : '',dot:'width:8px;height:8px;border-radius:999px;background:' + this.HKC[k],canAdv:!!HKN[k],adv:HKADV[k] || '',
          tap:() => { const to = HKN[k]; if (!to) { self.toast('Room ' + r.no + ' · ' + k); return; } self.setState(x => ({hk:{...x.hk,[r.no]:to}})); self.toast('Room ' + r.no + ' · ' + to); },
          style:'display:flex;flex-direction:column;gap:4px;align-items:flex-start;background:var(--bg-elevated);border:1px solid ' + (pri ? 'rgba(255,178,63,.6)' : 'var(--line)') + ';border-radius:var(--r-md);padding:12px;color:var(--fg-1);cursor:pointer;text-align:left;min-height:96px'}; })}; })};
    const live = s.pays.filter(p => p.live), tot = live.reduce((a,p) => a + p.a,0), byM = m => idr(live.filter(p => p.m === m).reduce((a,p) => a + p.a,0));
    const folios = s.g.filter(x => x.kind !== 'arr' && x.bal > 0);
    const fo = folios.find(x => x.id === s.csFolio) || folios[0];
    const cs = {since:'07:02',total:idr(tot),close:() => self.toast('Shift closed · ' + idr(tot) + ' counted · handover printed'),kpis:[{l:'Cash',v:byM('Cash')},{l:'Card',v:byM('Card')},{l:'QRIS',v:byM('QRIS')},{l:'Transactions',v:String(live.length)}],
      rows:s.pays.slice().reverse().map((p,i) => ({t:p.t,g:p.g,m:p.m,a:idr(p.a),live:p.live,op:p.live ? 1 : .5,void:() => { self.setState(x => ({pays:x.pays.map(y => y === p ? {...y,live:false} : y)})); self.toast('Voided · ' + idr(p.a) + ' · needs GM approval'); }})),
      folios:folios.map(x => ({l:x.guest + ' · ' + x.room,bal:idr(x.bal),pick:() => self.setState({csFolio:x.id}),style:'display:flex;align-items:center;gap:8px;width:100%;padding:10px 12px;border-radius:var(--r-sm);border:1px solid ' + ((fo && fo.id === x.id) ? 'var(--accent-violet)' : 'var(--line)') + ';background:' + ((fo && fo.id === x.id) ? 'var(--violet-wash)' : 'transparent') + ';color:var(--fg-1);cursor:pointer;font-size:13px'})),
      methods:['Cash','Card','QRIS','Transfer'].map(m => ({l:m,pick:() => self.setState({csMethod:m}),style:hkChip(s.csMethod === m) + ';text-align:center'})),
      amt:s.csAmt,onAmt:e => self.setState({csAmt:e.target.value}),full:() => self.setState({csAmt:fo ? String(fo.bal).replace(/\B(?=(\d{3})+(?!\d))/g,',') : ''}),half:() => self.setState({csAmt:fo ? String(Math.round(fo.bal / 2)).replace(/\B(?=(\d{3})+(?!\d))/g,',') : ''}),
      post:() => { const n = Number(String(s.csAmt).replace(/\D/g,'')); if (!fo || !n) { self.toast('Pick a folio and enter an amount'); return; } const d = new Date(), t = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); self.setState(x => ({pays:[...x.pays,{t,g:fo.guest + ' · ' + fo.room,m:s.csMethod,a:n,live:true}],g:x.g.map(y => y.id === fo.id ? {...y,bal:Math.max(0,y.bal - n)} : y),csAmt:''})); self.toast(idr(n) + ' recorded · ' + fo.guest + ' · receipt printed'); }};
    return {themeIcon:this.state.theme === 'light' ? 'moon' : 'sun',themeLabel:this.state.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme',themeToggle:() => { const n = this.state.theme === 'light' ? 'dark' : 'light'; try { localStorage.setItem('upx_theme',n); document.documentElement.setAttribute('data-theme',n); } catch (e) {} this.setState({theme:n}); },helpOpen:this.state.hlp,helpToggle:() => this.setState(x => ({hlp:!x.hlp})),helpLink:'../desktop/help/' + encodeURI('Help centre.dc.html'),helpTips:[['Check in from the room map','Select an arrival with no room. Only clean rooms of the booked type are active on the map. Tap one, then Assign and Check in.'],['Change a room','Select the guest, open the room map and tap another clean room.'],['Take a payment','Open the guest and tap Pay. Choose the method. Partial payments are fine.'],['Rooms tab','Shows housekeeping status. Tap a room to see the attendant and estimated ready time.'],['Cashier tab','Shows payments of the shift. Close the shift from the desktop cashier.']].map(h => ({t:h[0],d:h[1]})),title:{front:'Front desk',hk:'Housekeeping',cash:'Cashier'}[md],md:{front:md === 'front',hk:md === 'hk',cash:md === 'cash'},hkT,cs,
      rail:[['front','Front desk','log-in'],['hk','Rooms','bed-double'],['cash','Cashier','banknote'],['cal','Calendar','calendar-days'],['guests','Guests','users'],['waitlist','Waitlist','clock']].map((r,i) => ({label:r[1],icon:r[2],go:() => { if (['front','hk','cash'].includes(r[0])) self.setState({mode:r[0]}); else if (window.__tabletExt) window.__tabletExt(r[0]); else self.toast(r[1] + ' needs the desktop. Open UPSCALE Hotel OS.'); },style:'width:60px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 0;border:none;border-radius:var(--r-md);cursor:pointer;color:' + (md === r[0] ? 'var(--fg-1)' : 'var(--fg-3)') + ';background:' + (md === r[0] ? 'var(--violet-wash)' : 'transparent')})),
      q:s.q,onQ:e => self.setState({q:e.target.value}),segs,rows,noRows:rows.length === 0,emptyText:q ? 'No guests match "' + s.q + '".' : seg === 'arrivals' ? 'No arrivals left. Quiet evening.' : 'Nothing here.',
      d,groups,mapHint:needRoom ? 'Tap a highlighted room to assign it to ' + sel.guest + '.' : 'Colors show housekeeping status. Room guests show first name.',
      legend:[['Vacant Dirty','Dirty'],['Vacant Clean','Clean'],['Inspected','Inspected'],['Occupied','Occupied'],['OOO','Out of order']].map(l => ({label:l[1],dot:'width:8px;height:8px;border-radius:999px;background:' + this.HKC[l[0]]})),
      doCheckIn,doPay:() => { self.upd(sel.id,{bal:0}); self.toast('Payment recorded · ' + sel.guest); },doCheckOut:() => { self.setState(x => ({g:x.g.filter(y => y.id !== sel.id),hk:{...x.hk,[sel.room]:'Vacant Dirty'},sel:null})); self.toast(sel.guest + ' checked out · ' + sel.room + ' sent to housekeeping'); },
      hasToast:!!s.toast,toast:s.toast || ''};
  }
}


return Component;
};
