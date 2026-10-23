window.UPX_APPS = window.UPX_APPS || {};
window.UPX_APPS["mobile"] = function (DCLogic, React) {

class Component extends DCLogic {
  helpTips() { return {
    frontdesk:[['Check in a guest','Open Stays, tap Check in on the guest, finish the four steps, then Check in. The room must be clean.'],['Change or extend a stay','Open Stays, then In-house. Tap Change room or Extend +1.'],['Take a payment','Open Cashier, pick the guest with a balance and tap Record cash or Card / QRIS.'],['New booking','Open Stays, then New booking. Pick the dates, nights and room type.'],['Working offline','Keep going. Changes queue and send when you are back online.']],
    gm:[['Approve a request','Open Approvals, read the reason and amount, tap Approve. Voids and refunds ask for your PIN.'],['Read exceptions','Overview lists anything off today. Tap Notify to hand it to the team.'],['Approve a balance','Open Today. A departure with a balance has Approve balance and check out.'],['Working offline','You can read cached numbers. Approvals wait until you are online.']],
    housekeeping:[['Clean a room','Open My rooms, tap Start when you enter and Finish when done.'],['Inspect a room','Open Inspect, tap Pass, or choose a reason and tap Fail.'],['Do Not Disturb','Tap DND, set a time to try again. The supervisor sees it.'],['Report a fault','Open Report, pick the room and the issue. A ticket is created.'],['Handover','Open More, then Handover notes, and tap a quick note.']],
    revenue:[['Change one rate','Open Rates and tap -5% or +5% on a room type. Bulk edits are on desktop.'],['Stop-sell','Tap Stop-sell on a room type, or close a night on Channels.'],['Apply a suggestion','Open Suggestions, read the reason, tap Apply.'],['Channel issues','Open Channels to see errors. Fix mapping on desktop.']],
    finance:[['Record a payment','Open Cash, pick the folio and tap Record cash or Card / QRIS.'],['Approve a refund','Open Approvals. A refund asks for your PIN.'],['Chase receivables','Open Receivables. Send a reminder or record a payment.'],['Approve a bill','Open More, then Bills, and tap Approve.']],
    nightauditor:[['Run the night audit','Open Audit. Clear the blockers, then Roll one day.'],['Close the shift','Open Cash, count the drawer and tap Close shift.'],['Fix a balance','Open Folios. Settle a balance or adjust it with a reason.']],
    owner:[['See the numbers','Snapshot shows the month to date. Revenue splits by source and room type.'],['Switch property','Open Properties and tap Switch.'],['Read the digest','Open Digest and tap Open or Share.']],
    hr:[['Invite someone','Open Team and tap Copy invite link. The link works once.'],['Deactivate someone','Tap Deactivate. They are signed out everywhere.'],['Service charge','Open Service charge and edit a department\'s points.']]}; }
  constructor(p) {
    super(p);
    this.state = {theme:(() => { try { return localStorage.getItem('upx_theme') === 'light' ? 'light' : 'dark'; } catch (e) { return 'dark'; } })(),hlp:{},
      tab:{frontdesk:'today',gm:'overview',housekeeping:'mine',revenue:'rates',finance:'cash',nightauditor:'audit',owner:'snapshot',hr:'svc'},
      deps:[{id:'d1',g:'Sarah Whitfield · 102',amt:1500000,m:'Card hold',st:'Held',out:'Tomorrow'},{id:'d2',g:'Hans Becker · 202',amt:1000000,m:'Cash',st:'Held',out:'Today'},{id:'d3',g:'Elena Petrova · 301',amt:2000000,m:'QRIS',st:'Held',out:'Sun'},{id:'d4',g:'Ayumi Sato · V2',amt:3000000,m:'Card hold',st:'Settled · Rp 250,000 deducted',out:'Yesterday'}], svcSt:'draft', restr:{'Fri 11 Sep':{so:false,cta:true,min:2},'Sat 12 Sep':{so:false,cta:false,min:2},'Sun 13 Sep':{so:true,cta:false,min:1}},
      openArr:null, toasts:{}, hkFilter:'All', aiApplied:{}, acked:{}, appr:{}, reports:[], issueRoom:'104', issueType:'Plumbing',
      hk:{'101':'Vacant Clean','102':'Occupied','103':'Occupied','104':'Vacant Dirty','105':'Inspected','201':'Vacant Clean','202':'Occupied','203':'Vacant Dirty','204':'Occupied','301':'Occupied','302':'Vacant Dirty','303':'OOO','V1':'Inspected','V2':'Occupied'},
      arr:[
        {id:'a1',guest:'Wirawan Hadi',room:'101',type:'Deluxe King',ch:'Direct',eta:'13:30',pre:false,paid:false,checked:false,steps:{}},
        {id:'a2',guest:'Dewi Lestari',room:'201',type:'Deluxe Twin',ch:'Traveloka',eta:'14:00',pre:false,paid:false,checked:false,steps:{}},
        {id:'a3',guest:'James Okafor',room:'302',type:'Suite',ch:'Agoda',eta:'15:30',pre:false,paid:false,checked:false,steps:{}},
        {id:'a4',guest:'Budi Santoso',room:null,type:'Deluxe Twin',ch:'Direct',eta:'16:00',pre:false,paid:false,checked:false,steps:{}}],
      cash:[{id:'p1',g:'Hans Becker · 202',bal:0},{id:'p2',g:'Sarah Whitfield · 102',bal:3200000,due:true},{id:'p3',g:'Tanaka Kenji · 103',bal:1150000,due:true},{id:'p4',g:'Elena Petrova · 301',bal:8400000,due:true}],
      cashIn:5550000, remind:{}, auditDone:false, auditOverride:false, chanFixed:false, loading:{}, offline:false, queued:{}, syncError:false, push:{}, shiftClosed:false, depOut:false, fdSeg:'arrivals', resSeg:'all', bk:{in:3,n:2,type:'Deluxe King'}, bkDone:null, offered:{}, failWhy:'Not clean', rr:{}, billOk:{}, arPaid:{}, invited:false, off:{},
      notes:[{t:'07:00',by:'Wayan Sari',text:'302 needs extra towels for the arrival'},{t:'06:45',by:'Night shift',text:'Room 303 AC compressor is still out'}]
    };
    this.ROLES = [
      {id:'frontdesk',oid:'1a',name:'Front desk',who:'Ketut Arya',ini:'KA',tabs:[['today','Today','layout-dashboard'],['stays','Stays','log-in'],['rooms','Rooms','bed-double'],['cashier','Cashier','banknote']],more:[['calendar','Calendar','calendar-days','Occupancy and arrivals for the coming nights'],['guests','Guests','users','Look up a guest in the house or arriving'],['waitlist','Waitlist','clock','Guests waiting for a sold-out night']]},
      {id:'gm',oid:'1b',name:'General manager',who:'Maya Sutrisno',ini:'MS',tabs:[['overview','Overview','layout-dashboard'],['approvals','Approvals','shield-check'],['today','Today','log-in'],['reports','Reports','bar-chart-3']],more:[['reservations','Reservations','book-open','Arriving, in-house and departing guests'],['calendar','Calendar','calendar-days','Occupancy and arrivals for the coming nights'],['hkstatus','Housekeeping','sparkles','Room status right now'],['auditlog','Audit log','file-text','Sensitive actions today'],['auditstatus','Night audit','moon-star','Checklist and blockers']]},
      {id:'housekeeping',oid:'1c',name:'Housekeeping',who:'Wayan Sari',ini:'WS',tabs:[['mine','My rooms','sparkles'],['board','Board','layout-grid'],['inspect','Inspect','check'],['issues','Report','wrench']],more:[['handover','Handover notes','file-text','What the next shift needs to know']]},
      {id:'revenue',oid:'1d',name:'Revenue manager',who:'Daniel Hartono',ini:'DH',tabs:[['rates','Rates','bar-chart-3'],['pace','Pace','trending-up'],['channels','Channels','globe'],['ai','Suggestions','sparkles']],more:[['calendar','Calendar','calendar-days','Occupancy and arrivals for the coming nights'],['reports','Manager report','file-text','Revenue by channel and segment']]},
      {id:'finance',oid:'1e',name:'Finance',who:'Rina Kusuma',ini:'RK',tabs:[['cash','Cash','banknote'],['approvals','Approvals','shield-check'],['ar','Receivables','file-text'],['audit','Audit','moon-star']],more:[['deps','Deposits','shield','Held deposits to settle'],['svc','Service charge','hand-coins','This month and the draft distribution'],['bills','Bills','file-text','Supplier bills to approve'],['reports','Reports','bar-chart-3','Revenue by channel and segment']]},
      {id:'nightauditor',oid:'1g',name:'Night auditor',who:'Dewi Lestari',ini:'DL',tabs:[['audit','Audit','moon-star'],['cash','Cash','banknote'],['folios','Folios','file-text'],['reports','Day-end','bar-chart-3']],more:[['reservations','Reservations','book-open','Arriving, in-house and departing guests']]},
      {id:'owner',oid:'1f',name:'Owner',who:'Pak Budiman',ini:'PB',tabs:[['snapshot','Snapshot','layout-dashboard'],['revenue','Revenue','bar-chart-3'],['digest','Digest','file-text'],['properties','Properties','layout-grid']],more:[['approvals','Approvals','shield-check','Pending requests, view only']]},
      {id:'hr',oid:'1h',name:'HR',who:'Sari Wulandari',ini:'SW',tabs:[['svc','Service charge','hand-coins'],['team','Team','users']]}];
    this.TYPES = {'Deluxe King':['101','102','103','104','105'],'Deluxe Twin':['201','202','203','204'],'Suite':['301','302','303'],'Pool Villa':['V1','V2']};
    this.HKC = {'Vacant Dirty':'var(--room-vacant-dirty)','Vacant Clean':'var(--room-vacant-clean)','Inspected':'var(--room-inspected)','Occupied':'var(--room-occupied)','OOO':'var(--room-ooo)'};
    this.HKW = {'Vacant Dirty':'var(--room-vacant-dirty-w)','Vacant Clean':'var(--room-vacant-clean-w)','Inspected':'var(--room-inspected-w)','Occupied':'var(--room-occupied-w)','OOO':'var(--room-ooo-w)'};
    this.OUTLOOK = [64,71,79,86,93,93,79,64,57,71,79,86,71,64];
    this.DOW = ['T','W','T','F','S','S','M','T','W','T','F','S','S','M'];
  }
  idr(n) { return 'Rp ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  componentDidMount() { this._hkTick = setInterval(() => { const tm = this.state.hkTm || {}; if (Object.values(tm).some(t => t.run)) this.forceUpdate(); },1000); this._pt = setTimeout(() => this.sendPush(['frontdesk']), 6000); }
  componentWillUnmount() { clearTimeout(this._pt); }
  toast(role, text) { const off = this.state.offline; this.setState(s => ({toasts:{...s.toasts,[role]:off ? 'Offline. Queued: ' + text : text},queued:off ? {...s.queued,[role]:(s.queued[role] || 0) + 1} : s.queued})); setTimeout(() => this.setState(s => ({toasts:{...s.toasts,[role]:null}})), 2600); }
  setTab(role, t) { this.setState(s => ({tab:{...s.tab,[role]:t},loading:{...s.loading,[role]:true}})); setTimeout(() => this.setState(s => ({loading:{...s.loading,[role]:false}})), 380); }
  empty(icon, title, text) { return this.blk('Empty',{icon,title,text}); }
  PUSH() { return {frontdesk:{text:'Wirawan Hadi is 10 minutes away. Room 101 is ready.',tab:'stays'},gm:{text:'Fri 11 Sep reached 93% with 1 room left.',tab:'overview'},housekeeping:{text:'Room 302 is needed by 15:30. Arrival priority.',tab:'mine'},revenue:{text:'Expedia sync is degraded. 1 rate below parity.',tab:'channels'},finance:{text:'Kemenparekraf is over its credit limit.',tab:'ar'},nightauditor:{text:'Night audit is due at 02:00. 4 arrivals are not checked in.',tab:'audit'},owner:{text:'Your weekly digest is ready.',tab:'digest'},hr:{text:'September service charge is waiting to be submitted.',tab:'svc'}}; }
  sendPush(roles) { const P = this.PUSH(), set = {}; (roles || Object.keys(P)).forEach(r => { set[r] = P[r]; }); this.setState(s => ({push:{...s.push,...set}})); setTimeout(() => this.setState(s => { const n = {...s.push}; Object.keys(set).forEach(r => { if (n[r] === set[r]) delete n[r]; }); return {push:n}; }), 7000); }
  roomFor(a) {
    const s = this.state; if (a.room) return a.room;
    const taken = s.arr.map(x => x.room).filter(Boolean);
    return this.TYPES[a.type].find(r => s.hk[r] !== 'Occupied' && s.hk[r] !== 'OOO' && !taken.includes(r));
  }
  stepState(a) { const o = a.steps || {}; return {id:a.pre || !!o.id, room:!!a.room || !!o.room, pay:a.paid || a.pre || !!o.pay, dep:!!o.dep}; }
  blk(kind, d) { return {isEmpty:false,isSkel:false,isHero:false,isKpis:false,isAlert:false,isList:false,isBars:false,isHbars:false,isChips:false,isGrid:false,isChecklist:false,isNote:false,['is' + kind]:true,...d}; }
  hero(eyebrow, value, note, color) { return this.blk('Hero',{eyebrow,value,note,vstyle:'font-family:var(--font-display);font-weight:700;font-size:34px;letter-spacing:-0.02em;color:' + (color || 'var(--fg-1)')}); }
  kpis(items) { return this.blk('Kpis',{items:items.map(i => ({label:i[0],value:i[1],note:i[2] || '',style:'font-family:var(--font-mono);font-size:' + (String(i[1]).length > 9 ? 15 : 19) + 'px;font-weight:600;white-space:nowrap;color:' + (i[3] || 'var(--fg-1)')}))}); }
  alert(tone, title, text, btn, run, btnVariant) {
    const C = {ai:['var(--ai-tint)','var(--ai-edge)','var(--ai-fg)'],warn:['var(--bg-elevated)','rgba(255,178,63,.5)','var(--warning)'],bad:['var(--bg-elevated)','rgba(255,90,122,.5)','var(--room-ooo)'],live:['var(--bg-elevated)','rgba(0,212,255,.4)','var(--accent-cyan)']}[tone];
    return this.blk('Alert',{title,text,btn,run,hasBtn:!!btn,btnVariant:btnVariant || 'secondary',style:'background:' + C[0] + ';border:1px solid ' + C[1] + ';border-radius:var(--r-lg);padding:14px;display:flex;flex-direction:column;gap:8px',titleStyle:'font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:' + C[2]});
  }
  row(title, sub, o = {}) { return {title,sub,right:o.right || '',hasRight:!!o.right,rstyle:'font-family:var(--font-mono);font-size:13px;font-weight:600;' + (o.rcolor ? 'color:' + o.rcolor : ''),pill:o.pill || '',hasPill:!!o.pill,tone:o.tone || 'neutral',btns:o.btns || [],hasBtn:!!(o.btns && o.btns.length),open:!!o.steps,steps:o.steps || [],cta:o.cta || {label:'',off:true,run:() => {}}}; }
  btn(label, run, variant, icon, disabled) { return {label,run,variant:variant || 'primary',icon:icon || '',disabled:!!disabled}; }
  list(title, rows) { return this.blk('List',{title,rows}); }
  bars(title, vals, labels, h, hi) { const mx = Math.max(...vals); return this.blk('Bars',{title,h:h || 130,bars:vals.map((v,i) => ({val:v,label:labels[i] || '',style:'width:100%;border-radius:3px 3px 0 0;height:' + Math.max(6,Math.round(78 * v / mx)) + 'px;background:' + (i === 0 ? 'var(--accent-cyan)' : v >= 85 ? 'var(--accent-violet)' : v >= 70 ? 'var(--accent-violet-hi)' : 'rgba(238,244,255,.16)')}))}); }
  hbars(title, rows, col) { return this.blk('Hbars',{title,bars:rows.map(r => ({label:r[0],val:r[2],style:'display:block;height:100%;width:' + r[1] + '%;background:' + (col || 'var(--accent-violet)')}))}); }
  chips(items) { return this.blk('Chips',{items}); }
  chipStyle(on) { return 'flex:none;border:1px solid ' + (on ? 'var(--accent-violet)' : 'var(--line)') + ';border-radius:999px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;color:' + (on ? 'var(--fg-1)' : 'var(--fg-2)') + ';background:' + (on ? 'var(--accent-violet)' : 'transparent'); }
  dot(done) { return 'width:22px;height:22px;flex:none;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;' + (done ? 'background:var(--accent-cyan);color:#061020' : 'border:1px solid var(--line-strong);color:var(--fg-3)'); }
  checkItem(label, note, done, i) { return {label,note,done,mark:done ? '✓' : String(i),dot:this.dot(done)}; }

  tabsFor(r) { return r.more ? r.tabs.concat([['more','More','more-horizontal']]) : r.tabs; }
  moreIds(role) { const R = this.ROLES.find(x => x.id === role); return R && R.more ? R.more.map(m => m[0]) : []; }
  backChip(role) { const self = this; return this.chips([{label:'‹ More',pick:() => self.setTab(role,'more'),style:this.chipStyle(false)}]); }
  moreScreen(role) {
    const R = this.ROLES.find(x => x.id === role), self = this;
    return [this.list('More',R.more.map(m => this.row(m[1],m[3],{btns:[this.btn('Open',() => self.setTab(role,m[0]),'secondary',m[2])]}))),this.blk('Note',{text:'Setup, bulk edits and the full reports are on desktop. This menu holds what the role needs during a shift.'})];
  }
  // Cash drawer and open folios. The front desk, finance and the night auditor share one drawer.
  cashScreen(role, closing) {
    const s = this.state, self = this, idr = n => this.idr(n), B = [];
    B.push(this.hero('Expected in drawer',idr(2000000 + s.cashIn),'Opening float Rp 2,000,000 · Amira K.','var(--fg-1)'));
    B.push(this.kpis([['Shift',s.shiftClosed ? 'Closed' : 'Open',s.shiftClosed ? 'counted and handed over' : 'since 07:02',s.shiftClosed ? 'var(--fg-3)' : 'var(--accent-cyan)'],['Cash collected',idr(s.cashIn),'today']]));
    B.push(this.list('Open folios',s.cash.filter(c => c.due).map(c => this.row(c.g,'Balance due',{right:idr(c.bal),btns:[this.btn('Record cash',() => { self.setState(x => ({cashIn:x.cashIn + c.bal,cash:x.cash.map(y => y.id === c.id ? {...y,due:false} : y)})); self.toast(role,idr(c.bal) + ' recorded · ' + c.g); },'primary','banknote'),this.btn('Card / QRIS',() => { self.setState(x => ({cash:x.cash.map(y => y.id === c.id ? {...y,due:false} : y)})); self.toast(role,idr(c.bal) + ' paid by card or QRIS · ' + c.g); },'secondary')]}))));
    if (closing) B.push(this.alert('warn','Close the shift',s.shiftClosed ? 'Drawer counted and handed over. Variance Rp 0.' : 'Count the drawer and hand over. Expected ' + idr(2000000 + s.cashIn) + '.',s.shiftClosed ? '' : 'Close shift',() => { self.setState({shiftClosed:true}); self.toast(role,'Shift closed · variance Rp 0'); },'primary'));
    return B;
  }
  calendarScreen(role) {
    const days = [['Tue 8 Sep','64%','9 of 14 rooms'],['Wed 9 Sep','71%','10 of 14'],['Thu 10 Sep','79%','11 of 14'],['Fri 11 Sep','93%','13 of 14 · 1 room left'],['Sat 12 Sep','93%','13 of 14'],['Sun 13 Sep','79%','11 of 14'],['Mon 14 Sep','64%','9 of 14']];
    return [this.bars('Occupancy · next 14 days',this.OUTLOOK,this.DOW,140),this.list('Next 7 nights',days.map(d => this.row(d[0],d[2],{right:d[1],rcolor:d[1] === '93%' ? 'var(--warning)' : ''}))),this.blk('Note',{text:'Drag-to-move and the full room calendar are on desktop and tablet.'})];
  }
  reservationsScreen(role) {
    const s = this.state, self = this, f = s.resSeg || 'all';
    const rows = [...s.arr.map(a => ({g:a.guest,sub:'Arrives ' + a.eta + ' · ' + a.type + ' · ' + a.ch,st:a.checked ? 'inhouse' : 'arriving',pill:a.checked ? 'In-house' : a.noShow ? 'No-show' : a.pre ? 'Pre-checked' : 'Arriving'})),{g:'Sarah Whitfield',sub:'Room 102 · out Fri 11 Sep · Booking.com',st:'inhouse',pill:'In-house'},{g:'Tanaka Kenji',sub:'Room 103 · out Thu 10 Sep · Agoda',st:'inhouse',pill:'In-house'},{g:'Rahmat H.',sub:'Room 204 · out today',st:'departing',pill:'Departing'}];
    const F = [['all','All'],['arriving','Arriving'],['inhouse','In-house'],['departing','Departing']];
    return [this.chips(F.map(x => ({label:x[1],pick:() => self.setState({resSeg:x[0]}),style:this.chipStyle(f === x[0])}))),this.list('Reservations · ' + rows.filter(r => f === 'all' || r.st === f).length,rows.filter(r => f === 'all' || r.st === f).map(r => this.row(r.g,r.sub,{pill:r.pill,tone:r.st === 'inhouse' ? 'positive' : r.st === 'departing' ? 'warning' : 'brand'}))),this.blk('Note',{text:'Changing or cancelling a booking is on the front desk phone and on desktop.'})];
  }
  reportsScreen(role) {
    const idr = n => this.idr(n);
    return [this.kpis([['Revenue today',idr(19670000),'+4.2% vs prior'],['Occupancy','64%','9 of 14 rooms'],['ADR',idr(2185556),'+1.8%'],['RevPAR',idr(1405000),'+3.0%']]),this.hbars('Revenue by channel · today',[['Direct',44,'Rp 8,7 jt'],['Booking.com',24,'Rp 4,7 jt'],['Agoda',14,'Rp 2,8 jt'],['Expedia',10,'Rp 2,0 jt'],['Traveloka',8,'Rp 1,5 jt']]),this.hbars('By segment · today',[['Leisure',58,'Rp 11,4 jt'],['Corporate',24,'Rp 4,7 jt'],['Group',18,'Rp 3,5 jt']],'var(--accent-violet-hi)'),this.kpis([['Pickup · 24h','+9','room-nights','var(--accent-cyan)'],['Weekend pace','+18%','vs last week','var(--accent-cyan)']]),this.blk('Note',{text:'The PDF owner pack and custom date ranges are on desktop.'})];
  }
  approvalsScreen(role, ids, canAct) {
    const s = this.state, self = this, B = [];
    const A = [['void','Void posting · Rp 108,900','Hans Becker · Suite 401 · Minibar duplicate','Requested by Dewi L.'],['refund','Refund Rp 500,000 deposit','Chloe Martin · 201 · cash','Requested by Amira K.'],['up','Complimentary upgrade','Sarah Whitfield · Deluxe King → Suite 301','Platinum guest'],['rate','Rate override −5%','Bank Mandiri · 3 nights · Deluxe King','Requested by Ketut'],['ref','Refund Rp 750,000','Tom Reeves · early departure','Requested by Ketut']].filter(a => !ids || ids.includes(a[0]));
    if (canAct && s.pinFor && A.find(a => a[0] === s.pinFor)) B.push(this.blk('Pin',{label:'PIN for ' + (A.find(a => a[0] === s.pinFor) || [])[1],value:s.pin || '',onInput:e => self.setState({pin:e.target.value.replace(/\D/g,'').slice(0,4)}),cancel:() => self.setState({pinFor:null,pin:''})}));
    B.push(this.list('Pending approvals · ' + A.filter(a => !s.appr[a[0]]).length,A.map(a => this.row(a[1],a[2],{right:'',pill:s.appr[a[0]] ? (s.appr[a[0]] === 'ok' ? 'Approved' : 'Declined') : a[3],tone:s.appr[a[0]] === 'ok' ? 'positive' : s.appr[a[0]] ? 'negative' : 'neutral',btns:(!canAct || s.appr[a[0]]) ? [] : [this.btn(s.pinFor === a[0] ? 'Confirm PIN' : 'Approve',() => { const sens = a[0] === 'void' || a[0] === 'refund' || a[0] === 'ref'; if (sens && s.pinFor !== a[0]) { self.setState({pinFor:a[0],pin:''}); self.toast(role,'Enter your 4-digit PIN to approve this ' + (a[0] === 'void' ? 'void' : 'refund')); return; } if (sens && (s.pin || '').length !== 4) { self.toast(role,'PIN must be 4 digits'); return; } self.setState(x => ({appr:{...x.appr,[a[0]]:'ok'},pinFor:null,pin:''})); self.toast(role,a[1] + ' approved' + (sens ? ' · PIN verified · logged' : '')); },'primary','check'),this.btn('Decline',() => { self.setState(x => ({appr:{...x.appr,[a[0]]:'no'}})); self.toast(role,'Declined'); },'ghost','x')]}))));
    if (!canAct) B.push(this.blk('Note',{text:'View only. Requests are approved by the general manager or finance.'}));
    return B;
  }
  auditScreen(role, left, dirty) {
    const s = this.state, self = this, B = [];
    const pend = s.arr.filter(a => !a.checked && !a.noShow).length, hard = pend > 0 && !s.auditDone;
    B.push(this.hero('Night audit',s.auditDone ? 'Rolled' : 'Due 02:00',s.auditDone ? 'Business date is now Wed 9 Sep' : '1 day to close',s.auditDone ? 'var(--accent-cyan)' : 'var(--fg-1)'));
    const items = [this.checkItem('Arrivals checked in',pend ? pend + ' not checked in. Blocks the roll.' : 'All checked in or marked no-show',!pend || s.auditDone,1),this.checkItem('Housekeeping caught up',dirty.length ? dirty.length + ' dirty rooms carry forward' : 'All rooms clean',!dirty.length,2),this.checkItem('Prior closes balanced','Last close Variance −25,000 on 5 Sep',true,3)];
    B.push(this.blk('Checklist',{title:'Pre-audit report',items,hasCta:true,ctaOff:s.auditDone || (hard && !s.auditOverride),ctaLabel:s.auditDone ? 'Rolled to 9 Sep' : hard && s.auditOverride ? 'Override and roll one day' : 'Roll one day',ctaRun:() => { self.setState(x => ({auditDone:true,arr:x.arr.map(a => a.checked ? a : {...a,noShow:true})})); self.toast(role,'Night audit complete'); }}));
    if (hard) B.push(this.chips([{label:s.auditOverride ? 'Override on' : 'Override blockers',pick:() => self.setState(x => ({auditOverride:!x.auditOverride})),style:this.chipStyle(s.auditOverride)}]));
    return B;
  }
  svcScreen(role, canEdit) {
    const s = this.state, self = this, idr = n => this.idr(n), B = [];
    const approved = s.svcSt === 'approved';
    B.push(this.hero('Service charge · Sep',idr(21400000),'Collected to date · 10% on room and F&B','var(--fg-1)'));
    B.push(this.kpis([['Per point',idr(285000),'46 points this month'],['Status',approved ? 'Approved' : 'Draft','by GM',approved ? 'var(--accent-cyan)' : 'var(--warning)']]));
    B.push(this.list('By department',[['Front office',8,3],['Housekeeping',14,2],['F&B service',12,3],['Engineering',4,2],['Management',3,0]].map(d => this.row(d[0],d[1] + ' staff · ' + (d[1] + d[2] * .5) + ' points',{right:idr(Math.round((d[1] + d[2] * .5) * 285000)),btns:canEdit ? [this.btn('Edit points',() => self.toast(role,d[0] + ' · points opened for editing'),'ghost','pencil')] : []}))));
    if (!approved) B.push(this.alert('warn','Awaiting approval','August is locked. September distribution is a draft until the GM approves it.','Submit to GM',() => { self.setState({svcSt:'approved'}); self.toast(role,'Submitted · Maya Sutrisno notified'); },'primary'));
    else B.push(this.blk('Note',{text:'Approved. Per-person statements are printable from the desktop.'}));
    return B;
  }

  screen(role, tab) {
    const s = this.state, self = this, idr = n => this.idr(n);
    const dirty = Object.keys(s.hk).filter(r => s.hk[r] === 'Vacant Dirty'), left = s.arr.filter(a => !a.checked && !a.noShow);
    let B = [];
    if (s.loading[role]) return [this.blk('Skel',{h:96}),this.blk('Skel',{h:150}),this.blk('Skel',{h:72}),this.blk('Skel',{h:110})];
    if (s.syncError) B.push(this.alert('bad','Sync failed','Could not reach the server. Showing data from 09:32.','Retry',() => { self.setState({syncError:false}); self.toast(role,'Reconnected. Data refreshed.'); },'secondary'));
    if (tab === 'more') return B.concat(this.moreScreen(role));
    if (this.moreIds(role).includes(tab)) B.push(this.backChip(role));
    // screens that several roles open from their More menu
    if (tab === 'calendar') return B.concat(this.calendarScreen(role));
    if (tab === 'reservations') return B.concat(this.reservationsScreen(role));
    if (tab === 'reports' && role !== 'nightauditor') return B.concat(this.reportsScreen(role));
    if (tab === 'hkstatus') { B.push(this.hero('Rooms to clean',String(dirty.length),'Dirty now · ' + Object.keys(s.hk).filter(r => s.hk[r] === 'Vacant Clean').length + ' clean, waiting for inspection','var(--warning)')); B.push(this.grid('All',false,role)); return B; }
    if (tab === 'auditlog') {
      const L = [['08:41','Maya Sutrisno','Approved rate change · Deluxe King +12%'],['08:05','Dewi L.','Requested void · Rp 108,900 · Suite 401'],['07:48','Ketut Arya','Changed room · Wirawan Hadi · 101'],['07:30','Amira K.','Opened shift · float Rp 2,000,000'],['Yesterday 23:40','Rina Kusuma','Refunded deposit · Rp 750,000 · PIN']];
      B.push(this.list('Sensitive actions · today',L.map(l => this.row(l[2],l[1],{right:l[0]}))));
      B.push(this.blk('Note',{text:'The full log with filters and CSV download is on desktop. Entries cannot be edited or deleted.'}));
      return B;
    }
    if (tab === 'auditstatus') return B.concat(this.auditScreen(role,left,dirty));
    if (role === 'frontdesk') {
      if (tab === 'today') {
        B.push(this.hero('Arrivals left',String(left.length),left.length ? 'Next: ' + left[0].guest + ' · ' + left[0].eta : 'All arrivals checked in','var(--accent-cyan)'));
        B.push(this.kpis([['In-house',String(5 + s.arr.filter(a => a.checked).length),'guests'],['Departures',s.depOut ? '0' : '1','Rahmat H. · 204'],['Unassigned',String(s.arr.filter(a => !a.room && !a.checked).length),'sold, no room'],['Occupancy','64%','tonight']]));
        B.push(this.alert('live','Live · occupancy','Fri 11 Sep is at 93% with 1 room left. Hold walk-ins for that night.','Tell revenue manager',() => self.toast('frontdesk','Sent to Daniel Hartono')));
        B.push(this.list('Next arrivals',left.slice(0,2).map(a => this.row(a.guest,a.type + ' · ' + a.ch,{right:a.eta,btns:[this.btn('Check in',() => { self.setState({openArr:a.id,fdSeg:'arrivals'}); self.setTab('frontdesk','stays'); },a.pre ? 'primary' : 'secondary','log-in')]}))));
        B.push(this.list('Departures today',[this.row('Rahmat H.','Room 204 · balance Rp 0 · settled',{pill:s.depOut ? 'Checked out' : 'Settled',tone:'positive',btns:s.depOut ? [] : [this.btn('Check out',() => { self.setState({depOut:true}); self.setState(x => ({hk:{...x.hk,'204':'Vacant Dirty'}})); self.toast('frontdesk','Rahmat H. checked out · room 204 sent to housekeeping'); },'primary','log-out')]})]));
      } else if (tab === 'stays') {
        const seg = s.fdSeg || 'arrivals';
        B.push(this.chips([['arrivals','Arrivals'],['inhouse','In-house'],['book','New booking']].map(x => ({label:x[1],pick:() => self.setState({fdSeg:x[0]}),style:this.chipStyle(seg === x[0])}))));
        if (seg === 'arrivals') {
          B.push(this.list('Arrivals today · ' + left.length + ' left',s.arr.map(a => {
            const st = this.stepState(a), rm = this.roomFor(a), ready = rm && (s.hk[rm] === 'Vacant Clean' || s.hk[rm] === 'Inspected' || a.checked), open = s.openArr === a.id && !a.checked, all = st.id && st.room && st.pay && !!st.dep;
            const row = this.row(a.guest,(rm ? 'Room ' + rm : 'No room') + ' · ' + a.type + ' · ' + a.eta,{pill:a.noShow ? 'No-show' : a.checked ? 'In-house' : a.pre ? 'Pre-checked' : ready ? 'Room ready' : 'Room not ready',tone:a.checked ? 'positive' : a.pre || ready ? 'brand' : 'warning'});
            if (!a.checked && !a.noShow) row.btns = [this.btn(open ? 'Close' : 'Check in',() => self.setState(x => ({openArr:x.openArr === a.id ? null : a.id})),open ? 'ghost' : (a.pre ? 'primary' : 'secondary'),open ? 'x' : 'log-in')];
            row.hasBtn = row.btns.length > 0;
            if (open) {
              const setStep = k => () => self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,steps:{...y.steps,[k]:true}} : y)}));
              row.open = true;
              row.steps = [
                {...this.checkItem('Verify ID',st.id ? (a.pre ? 'Passport scanned online' : 'Passport scanned') : 'Scan passport or KTP',st.id,1),btn:st.id ? 'Verified' : 'Scan ID',run:setStep('id')},
                {...this.checkItem('Assign room',a.room ? 'Room ' + a.room + (ready ? ' · ready' : ' · still being cleaned') : rm ? 'Suggested ' + rm + (ready ? ' · ready' : ' · being cleaned') : 'No room free',!!a.room,2),btn:a.room ? 'Assigned' : rm ? 'Assign ' + rm : 'None',run:() => { if (rm) self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,room:rm} : y)})); }},
                {...this.checkItem('Payment',st.pay ? (a.pre ? 'Card on file' : 'Prepayment taken') : 'Prepayment ' + idr(1550000),st.pay,3),btn:st.pay ? 'Done' : 'Take payment',run:setStep('pay')},
                {...this.checkItem('Security deposit',st.dep ? idr(500000) + ' held · cash' : 'Refundable ' + idr(500000) + ' per room',!!st.dep,4),btn:st.dep ? 'Taken' : 'Take deposit',run:() => { if (!st.dep) { setStep('dep')(); self.toast('frontdesk','Security deposit ' + idr(500000) + ' taken · cash'); } }}];
              const fin = a.room || rm;
              const rdy = fin && (s.hk[fin] === 'Vacant Clean' || s.hk[fin] === 'Inspected');
              row.cta = {label:all ? (rdy ? 'Check in and encode key' : 'Room ' + fin + ' not ready') : 'Complete steps to check in',off:!(all && rdy),run:() => { self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,checked:true,room:fin} : y),hk:{...x.hk,[fin]:'Occupied'},openArr:null})); self.toast('frontdesk',a.guest + ' checked in · room ' + fin + ' · key encoded'); }};
            }
            return row; })));
          B.push(this.blk('Note',{text:'A guest cannot be checked in until housekeeping has cleaned the room. Clean 302 or 203 on the housekeeping phone.'}));
        } else if (seg === 'inhouse') {
          B.push(this.list('In-house · ' + s.cash.length,s.cash.map(c => { const o = s.folOpen === c.id; const r = this.row(c.g,c.due ? 'Balance due · open folio' : 'Settled · open folio',{right:c.due ? idr(c.bal) : 'Rp 0',pill:c.due ? 'Due' : 'Settled',tone:c.due ? 'warning' : 'positive',btns:[this.btn(o ? 'Hide' : 'Folio',() => self.setState(x => ({folOpen:x.folOpen === c.id ? null : c.id})),'ghost'),this.btn('Change room',() => self.toast('frontdesk',c.g.split(' ·')[0] + ' moved to the next clean room of the same type'),'secondary','bed-double'),this.btn('Extend +1',() => self.toast('frontdesk',c.g.split(' ·')[0] + ' extended by one night · price shown before saving'),'secondary','calendar-plus')]}); r.hasBtn = true;
            if (o) { r.open = true; const net = Math.round(c.bal / 1.21); r.steps = [{...this.checkItem('Room nights',c.due ? idr(Math.round(net * 0.94)) + ' net · posts nightly at audit' : 'Prepaid · card on file',true,1),btn:c.due ? 'Posted' : 'Prepaid',run:() => {}},{...this.checkItem('Extras',c.due ? idr(Math.round(net * 0.06)) + ' net · minibar, laundry' : 'None posted',true,2),btn:c.due ? 'Posted' : 'None',run:() => {}},{...this.checkItem('PB1 10% + service 11%',c.due ? idr(c.bal - net) : 'Included in prepayment',true,3),btn:'Auto',run:() => {}}]; r.cta = {label:'Take payment on the Cashier tab',off:false,run:() => self.setTab('frontdesk','cashier')}; }
            return r; })));
        } else {
          const bk = s.bk, DW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
          const BASE = {'Deluxe King':1450000,'Deluxe Twin':1550000,'Suite':2900000,'Pool Villa':4800000}, total = BASE[bk.type] * bk.n * 1.21;
          const dl = d => { const x = new Date(Date.UTC(2026,8,8 + d)); return DW[x.getUTCDay()] + ' ' + x.getUTCDate() + ' Sep'; };
          B.push(this.chips([0,1,2,3,4,5,6].map(d => ({label:d === 0 ? 'Today' : dl(d).slice(0,3) + ' ' + dl(d).split(' ')[1],pick:() => self.setState(x => ({bk:{...x.bk,in:d}})),style:this.chipStyle(bk.in === d)}))));
          B.push(this.chips([1,2,3,4,5].map(n => ({label:n + (n === 1 ? ' night' : ' nights'),pick:() => self.setState(x => ({bk:{...x.bk,n}})),style:this.chipStyle(bk.n === n)}))));
          B.push(this.list('Rooms',Object.keys(BASE).map(t => this.row(t,'2 guests · best available rate',{right:idr(BASE[t]),btns:[this.btn(bk.type === t ? 'Selected' : 'Select',() => self.setState(x => ({bk:{...x.bk,type:t}})),bk.type === t ? 'secondary' : 'primary')]}))));
          B.push(this.alert('ai','New booking',(bk.in === 0 ? 'Today' : dl(bk.in)) + ' to ' + dl(bk.in + bk.n) + ' · ' + bk.type + ' · ' + idr(total) + ' incl. tax and service','Create booking',() => { self.setState(x => ({bkDone:{in:bk.in,n:bk.n,type:bk.type,total}})); self.toast('frontdesk','Booking created · confirmation sent'); },'primary'));
          if (s.bkDone) B.push(this.alert('live','Booking created',s.bkDone.type + ' · ' + (s.bkDone.in === 0 ? 'Today' : dl(s.bkDone.in)) + ' · ' + s.bkDone.n + ' night' + (s.bkDone.n === 1 ? '' : 's') + ' · ' + idr(s.bkDone.total) + '. Guest details and a deposit are added on the stay.'));
        }
      } else if (tab === 'cashier') {
        B.push(...this.cashScreen('frontdesk',false));
      } else if (tab === 'guests') {
        const G = [['Sarah Whitfield','Room 102 · Platinum · 6 stays','VIP'],['Tanaka Kenji','Room 103 · 2 stays · prefers high floor',''],['Hans Becker','Room 202 · 1 stay',''],['Elena Petrova','Room 301 · 3 stays · allergic to feathers','Returning'],['Wirawan Hadi','Arriving today 13:30 · 1st stay','']];
        B.push(this.list('Guests · in-house and arriving',G.map(g => this.row(g[0],g[1],{pill:g[2],tone:'brand'}))));
        B.push(this.blk('Note',{text:'Search across all past guests, merge duplicates and edit profiles on desktop.'}));
      } else if (tab === 'waitlist') {
        const W = [['w1','Rizky Aditya','Deluxe King · Fri 11 – Sun 13 Sep · 2 guests'],['w2','Anna Schmidt','Deluxe King · Fri 11 – Sat 12 Sep · 2 guests'],['w3','Lena Park','Suite · Sat 12 – Mon 14 Sep · 2 guests'],['w4','Pak Hendra','Deluxe Twin · Fri 11 – Sat 12 Sep · 3 guests']];
        B.push(this.hero('On the waitlist',String(W.filter(w => !s.offered[w[0]]).length),'sold-out nights · 1 room can be offered now','var(--accent-violet-hi)'));
        B.push(this.list('Queue',W.map((w,i) => this.row(w[1],w[2],{pill:s.offered[w[0]] ? 'Offered' : i === 0 ? 'First in line' : '',tone:s.offered[w[0]] ? 'positive' : 'brand',btns:s.offered[w[0]] || i > 0 ? [] : [this.btn('Offer room',() => { self.setState(x => ({offered:{...x.offered,[w[0]]:true}})); self.toast('frontdesk','Offer sent to ' + w[1] + ' · holds for 2 hours'); },'primary','send')]}))));
      } else {
        const F = ['All','Vacant Dirty','Vacant Clean','Inspected','Occupied','OOO'];
        B.push(this.chips(F.map(f => ({label:f === 'All' ? 'All' : f.replace('Vacant ','').replace('OOO','Out of order'),pick:() => self.setState({hkFilter:f}),style:this.chipStyle(s.hkFilter === f)}))));
        B.push(this.grid(s.hkFilter,false,role));
      }
    } else if (role === 'gm') {
      if (tab === 'overview') {
        B.push(this.hero('Tonight','64% occupied','9 of 14 rooms · peak 93% on Fri 11 Sep','var(--accent-cyan)'));
        B.push(this.kpis([['Revenue today','Rp 19,670,000','+4.2% vs prior'],['ADR','Rp 2,185,556','+1.8%'],['RevPAR','Rp 1,405,000','+3.0%'],['Guest score','4.8','1,204 reviews']]));
        const ap = s.aiApplied.king;
        B.push(this.alert('ai','AI suggestion',ap ? 'Applied. Deluxe King +12% for Fri and Sat is live on 5 channels.' : 'Deluxe King up 12% for Fri and Sat. Demand from 4 OTAs.',ap ? '' : 'Approve rate change',() => { self.setState(x => ({aiApplied:{...x.aiApplied,king:true}})); self.toast('gm','Rate change approved'); },'primary'));
        const items = [
          ['audit','Night audit due 02:00','Business date is current. ' + left.length + ' arrival' + (left.length === 1 ? '' : 's') + ' not yet checked in.','warn','Front desk'],
          ['ooo','Room 303 out of order','AC compressor. Ticket #482, overdue.','bad','Maintenance'],
          ['dirty',dirty.length + ' rooms still dirty','Cut-off for 14:00 check-in. 302 is an arrival.','warn','Housekeeping'],
          ['ar','Kemenparekraf over credit limit','Balance exceeds limit by Rp 2,500,000.','bad','Finance']];
        B.push(this.list('Exceptions · ' + items.filter(i => !s.acked[i[0]]).length + ' open',items.map(i => this.row(i[1],i[2],{pill:s.acked[i[0]] ? 'Assigned' : 'Open',tone:s.acked[i[0]] ? 'positive' : i[3] === 'bad' ? 'negative' : 'warning',btns:s.acked[i[0]] ? [] : [this.btn('Notify ' + i[4],() => { self.setState(x => ({acked:{...x.acked,[i[0]]:true}})); self.toast('gm',i[4] + ' notified'); },'secondary','send')]}))));
        B.push(this.bars('Occupancy · next 14 days',this.OUTLOOK,this.DOW,140));
      } else if (tab === 'approvals') {
        B.push(...this.approvalsScreen('gm',null,true));
      } else if (tab === 'today') {
        B.push(this.kpis([['Arrivals left',String(left.length),'of ' + s.arr.length],['In-house',String(5 + s.arr.filter(a => a.checked).length),'guests'],['Departures',String((s.depOut ? 0 : 1) + (s.cash.find(c => c.id === 'p3').due ? 1 : 0)),'left today'],['Occupancy','64%','tonight']]));
        const p3 = s.cash.find(c => c.id === 'p3');
        B.push(this.list('Departures',[this.row('Rahmat H.','Room 204 · settled',{pill:s.depOut ? 'Checked out' : 'Settled',tone:'positive'}),this.row('Tanaka Kenji','Room 103 · balance ' + (p3.due ? idr(p3.bal) : 'Rp 0'),{pill:p3.due ? 'Balance due' : 'Checked out',tone:p3.due ? 'warning' : 'positive',btns:p3.due ? [this.btn('Approve balance and check out',() => { self.setState(x => ({cash:x.cash.map(y => y.id === 'p3' ? {...y,due:false} : y)})); self.toast('gm','Tanaka Kenji checked out · balance approved · logged'); },'primary','check')] : []})]));
        B.push(this.list('Arrivals',s.arr.map(a => this.row(a.guest,a.type + ' · ' + a.ch + ' · ' + a.eta,{pill:a.checked ? 'In-house' : a.noShow ? 'No-show' : a.pre ? 'Pre-checked' : 'Arriving',tone:a.checked ? 'positive' : 'brand'}))));
        B.push(this.blk('Note',{text:'Checking guests in is on the front desk phone. You approve balances and exceptions.'}));
      }
    } else if (role === 'housekeeping') {
      if (tab === 'mine') {
        B.push(this.hero('Rooms to clean',String(dirty.length),dirty.length ? 'Before 14:00 · priority first' : 'All clean. Ask for inspection.','var(--warning)'));
        const arrRooms = s.arr.filter(a => !a.checked && a.room).map(a => a.room);
        const tm = s.hkTm || {}, dnd = s.hkDnd || {}, rush = s.hkRush || {};
        const seq = [...dirty].sort((a,b) => ((rush[b] ? 2 : 0) + (arrRooms.includes(b) ? 1 : 0)) - ((rush[a] ? 2 : 0) + (arrRooms.includes(a) ? 1 : 0)));
        const fmt = ms => { const m = Math.floor(ms / 60000), sx = Math.floor((ms % 60000) / 1000); return String(m).padStart(2,'0') + ':' + String(sx).padStart(2,'0'); };
        B.push(this.list('Your sheet · ' + seq.length + ' rooms',seq.map((r,i) => { const t = tm[r] || {el:0,run:false}, el = t.el + (t.run ? Date.now() - t.since : 0), isDnd = !!dnd[r];
          const sub = (rush[r] ? 'Rush · ' : arrRooms.includes(r) ? 'Arrival today · ' : '') + (i === 0 ? 'Departure clean · 1.5 cr' : 'Stayover · 1 cr') + ' · ' + Object.keys(this.TYPES).find(ty => this.TYPES[ty].includes(r)) + (isDnd ? ' · DND, retry ' + dnd[r] : t.run ? ' · ' + fmt(el) : el ? ' · paused ' + fmt(el) : '');
          const btns = isDnd ? [this.btn('Retry now',() => { self.setState(x => { const d = {...x.hkDnd}; delete d[r]; return {hkDnd:d}; }); },'ghost','bell')] : t.run ? [this.btn('Pause',() => self.setState(x => ({hkTm:{...x.hkTm,[r]:{...t,run:false,el:el}}})),'ghost','pause'),this.btn('Finish',() => { self.setState(x => ({hkTm:{...x.hkTm,[r]:{el,run:false,done:true,min:Math.max(1,Math.round(el / 60000))}},hk:{...x.hk,[r]:'Vacant Clean'}})); self.toast('housekeeping','Room ' + r + ' done · ' + fmt(el) + ' · sent for inspection'); },'primary','check')] : [this.btn(el ? 'Resume' : 'Start',() => { self.setState(x => ({hkTm:{...x.hkTm,[r]:{...t,run:true,since:Date.now()}}})); self.toast('housekeeping','Timer started · ' + r); },'primary','play'),this.btn('DND',() => { self.setState(x => ({hkDnd:{...x.hkDnd,[r]:'13:30'}})); self.toast('housekeeping','Room ' + r + ' skipped · retry 13:30'); },'ghost','bell-off')];
          return this.row((i + 1) + ' · Room ' + r,sub,{pill:rush[r] ? 'Rush' : arrRooms.includes(r) ? 'Priority' : t.run ? 'Cleaning' : '',tone:rush[r] ? 'negative' : t.run ? 'brand' : 'warning',btns}); })));
        if (!dirty.length) B.push(this.blk('Note',{text:'Nothing assigned. Clean rooms wait for the supervisor inspection.'}));
      } else if (tab === 'board') {
        B.push(this.grid('All',true,role));
        B.push(this.blk('Note',{text:'Tap a room to move it to the next status. Dirty → Clean → Inspected.'}));
      } else if (tab === 'inspect') {
        const clean = Object.keys(s.hk).filter(r => s.hk[r] === 'Vacant Clean'), why = s.failWhy || 'Not clean';
        B.push(this.hero('Waiting for inspection',String(clean.length),clean.length ? 'Arrivals first · pass or fail each room' : 'Nothing to inspect','var(--accent-cyan)'));
        B.push(this.chips(['Not clean','Missing items','Damage'].map(w => ({label:w,pick:() => self.setState({failWhy:w}),style:this.chipStyle(why === w)}))));
        B.push(this.list('Rooms',clean.map(r => this.row('Room ' + r,Object.keys(this.TYPES).find(ty => this.TYPES[ty].includes(r)) + (s.arr.some(a => a.room === r && !a.checked) ? ' · arrival today' : ''),{btns:[this.btn('Pass',() => { self.setState(x => ({hk:{...x.hk,[r]:'Inspected'}})); self.toast('housekeeping','Room ' + r + ' inspected · ready to sell'); },'primary','check'),this.btn('Fail',() => { self.setState(x => ({hk:{...x.hk,[r]:'Vacant Dirty'}})); self.toast('housekeeping','Room ' + r + ' failed · ' + why + ' · back to the cleaner as a rush redo'); },'secondary','x')]}))));
        B.push(this.blk('Note',{text:'A failed room needs a reason and returns to the same cleaner at the top of the sheet.'}));
      } else if (tab === 'handover') {
        const Q = ['Low on towels','Lost item found','Guest asked for late checkout','Room 303 AC still out'];
        B.push(this.chips(Q.map(q => ({label:q,pick:() => { self.setState(x => ({notes:[{t:'now',by:'Wayan Sari',text:q},...x.notes]})); self.toast('housekeeping','Note added to the handover'); },style:this.chipStyle(false)}))));
        B.push(this.list('Handover · this shift',s.notes.map(n => this.row(n.text,n.by,{right:n.t}))));
        B.push(this.blk('Note',{text:'Tap a quick note to add it. Free-text notes and photos are on the tablet.'}));
      } else {
        const rooms = ['101','104','203','302','303'], types = ['Plumbing','Electrical','AC','Furniture'];
        B.push(this.chips(rooms.map(r => ({label:'Room ' + r,pick:() => self.setState({issueRoom:r}),style:this.chipStyle(s.issueRoom === r)}))));
        B.push(this.chips(types.map(t => ({label:t,pick:() => self.setState({issueType:t}),style:this.chipStyle(s.issueType === t)}))));
        B.push(this.alert('ai','New ticket','Room ' + s.issueRoom + ' · ' + s.issueType + '. Maintenance (Budi) is notified and the room stays sellable unless blocked.','Submit report',() => { self.setState(x => ({reports:[{r:x.issueRoom,t:x.issueType},...x.reports]})); self.toast('housekeeping','Reported · ' + s.issueType + ' · room ' + s.issueRoom); },'primary'));
        if (s.reports.length) B.push(this.list('Reported today',s.reports.map(x => this.row('Room ' + x.r,x.t,{pill:'Sent',tone:'positive'}))));
      }
    } else if (role === 'revenue') {
      if (tab === 'rates') {
        const RT = [['Deluxe King',1450000],['Deluxe Twin',1550000],['Suite',2900000],['Pool Villa',4800000]];
        const cur = (t,b) => Math.round(((t === 'Deluxe King' && s.aiApplied.king ? 1.12 : 1) * b * (1 + ((s.rr[t] || {}).adj || 0) / 100)) / 1000) * 1000;
        B.push(this.hero('Stop-sell tonight',String(RT.filter(r => (s.rr[r[0]] || {}).stop).length),'room types closed on all channels','var(--fg-1)'));
        B.push(this.list('Rates tonight · best available',RT.map(r => { const st = s.rr[r[0]] || {adj:0,stop:false}, set = (p) => () => { self.setState(x => ({rr:{...x.rr,[r[0]]:{...(x.rr[r[0]] || {adj:0,stop:false}),...p(x.rr[r[0]] || {adj:0,stop:false})}}})); };
          return this.row(r[0],(st.adj ? (st.adj > 0 ? '+' : '') + st.adj + '% · ' : '') + (st.stop ? 'Stop-sell on' : 'On sale'),{right:idr(cur(r[0],r[1])),rcolor:st.adj || (r[0] === 'Deluxe King' && s.aiApplied.king) ? 'var(--ai-fg)' : '',btns:[this.btn('−5%',() => { set(c => ({adj:c.adj - 5}))(); self.toast('revenue',r[0] + ' rate −5% · pushed to 8 channels'); },'secondary'),this.btn('+5%',() => { set(c => ({adj:c.adj + 5}))(); self.toast('revenue',r[0] + ' rate +5% · pushed to 8 channels'); },'secondary'),this.btn(st.stop ? 'Open sales' : 'Stop-sell',() => { set(c => ({stop:!c.stop}))(); self.toast('revenue',r[0] + (st.stop ? ' open for sale' : ' stop-sell on all channels')); },st.stop ? 'primary' : 'destructive')]}); })));
        B.push(this.blk('Note',{text:'One date or room type at a time. The rate grid, plans, seasons and bulk edits are on desktop.'}));
      } else if (tab === 'pace') {
        B.push(this.kpis([['Pickup · 24h','+9','room-nights','var(--accent-cyan)'],['Weekend pace','+18%','vs last week','var(--accent-cyan)'],['OTB revenue','Rp 168 jt','next 14 nights'],['Group pickup','2 of 6','Mandiri retreat']]));
        B.push(this.bars('On the books · occupancy %',this.OUTLOOK,this.DOW,140));
        B.push(this.alert('warn','Group cut-off','Bali Yoga Collective has 5 rooms held and an unsigned contract. Cut-off in 6 days.'));
      } else if (tab === 'channels') {
        const C = [['Booking.com','Connected','In parity','2 min ago'],['Agoda','Connected','In parity','4 min ago'],['Expedia',s.chanFixed ? 'Connected' : 'Degraded',s.chanFixed ? 'In parity' : '1 rate below',s.chanFixed ? 'just now' : '38 min ago'],['Traveloka','Connected','In parity','7 min ago'],['Airbnb','Disconnected','—','3 days ago']];
        B.push(this.list('Channel health',C.map(c => this.row(c[0],c[2] + ' · synced ' + c[3],{pill:c[1],tone:c[1] === 'Connected' ? 'positive' : c[1] === 'Degraded' ? 'warning' : 'negative',btns:c[0] === 'Expedia' && !s.chanFixed ? [this.btn('Fix mapping',() => { self.setState({chanFixed:true}); self.toast('revenue','Expedia mapping fixed. Rates pushed.'); },'primary','wrench')] : c[1] === 'Disconnected' ? [this.btn('Reconnect',() => self.toast('revenue','Re-authentication link sent'),'destructive')] : []}))));
        const days = Object.keys(s.restr);
        B.push(this.list('Close-out by night · all room types',days.map(d => { const r = s.restr[d], tog = (k,v) => () => { self.setState(x => ({restr:{...x.restr,[d]:{...x.restr[d],[k]:v}}})); self.toast('revenue',d + ' · ' + (k === 'so' ? (v ? 'stop-sell on' : 'stop-sell off') : k === 'cta' ? (v ? 'closed to arrival' : 'open to arrival') : 'min stay ' + v + 'n') + ' · pushed to 8 channels'); };
          return this.row(d,[r.so ? 'Stop-sell' : null,r.cta ? 'CTA' : null,r.min > 1 ? 'Min ' + r.min + 'n' : null].filter(Boolean).join(' · ') || 'Open, no restrictions',{right:r.so ? 'Closed' : 'Open',rcolor:r.so ? 'var(--room-ooo)' : 'var(--accent-cyan)',btns:[this.btn(r.so ? 'Open sales' : 'Stop-sell',tog('so',!r.so),r.so ? 'secondary' : 'destructive'),this.btn(r.cta ? 'Allow arrival' : 'Close to arrival',tog('cta',!r.cta),'secondary'),this.btn('Min ' + (r.min >= 3 ? 1 : r.min + 1) + 'n',tog('min',r.min >= 3 ? 1 : r.min + 1),'ghost')]}); })));
        B.push(this.blk('Note',{text:'Per-channel and per-plan overrides and channel mapping are desktop only.'}));
      } else if (tab === 'ai') {
        const AI = [['king','Deluxe King · Fri, Sat','+12%','Forecast 93%. 4 OTAs searching, pace +18% vs last week.'],['suite','Suite · Fri, Sat','+8%','Two suites left. Comp set averages 9% above.'],['twin','Deluxe Twin · Tue, Wed','−6%','Two twins unsold tonight. Comp set averages 9% below.']];
        B.push(this.hero('AI suggestions',String(AI.filter(a => !s.aiApplied[a[0]]).length),'waiting for your decision','var(--ai-fg)'));
        AI.forEach(a => B.push(this.alert('ai',a[1] + ' · ' + a[2],a[3] + (s.aiApplied[a[0]] ? ' Applied.' : ''),s.aiApplied[a[0]] ? '' : 'Apply',() => { self.setState(x => ({aiApplied:{...x.aiApplied,[a[0]]:true}})); self.toast('revenue',a[1] + ' ' + a[2] + ' applied'); },'primary')));
      }
    } else if (role === 'finance') {
      if (tab === 'cash') {
        B.push(...this.cashScreen('finance',false));
      } else if (tab === 'approvals') {
        B.push(...this.approvalsScreen('finance',['refund','ref','void'],true));
      } else if (tab === 'deps') {
        const held = s.deps.filter(d => d.st === 'Held');
        B.push(this.hero('Deposits held',idr(held.reduce((a,d) => a + d.amt,0)),held.length + ' stays · settle at check-out','var(--fg-1)'));
        B.push(this.kpis([['Due back today',String(held.filter(d => d.out === 'Today').length),'check-outs'],['Settled this week','4','Rp 450,000 deducted']]));
        B.push(this.list('Held',held.map(d => this.row(d.g,d.m + ' · returns ' + d.out,{right:idr(d.amt),btns:[this.btn('Settle in full',() => { self.setState(x => ({deps:x.deps.map(y => y.id === d.id ? {...y,st:'Settled · nothing deducted'} : y)})); self.toast('finance',idr(d.amt) + ' returned · ' + d.g.split(' ·')[0]); },'primary','check'),this.btn('Deduct…',() => { self.setState(x => ({deps:x.deps.map(y => y.id === d.id ? {...y,st:'Settled · Rp 150,000 deducted'} : y)})); self.toast('finance','Rp 150,000 deducted · minibar · receipt sent'); },'secondary')]}))));
        B.push(this.list('Settled',s.deps.filter(d => d.st !== 'Held').map(d => this.row(d.g,d.st,{right:idr(d.amt),rcolor:'var(--fg-3)'}))));
      } else if (tab === 'svc') {
        B.push(...this.svcScreen('finance',false));
      } else if (tab === 'bills') {
        const BL = [['b1','PT Bali Linen','Linen service · INV-2291 · due 15 Sep',12400000],['b2','CV Segara Foods','F&B supplies · INV-0873 · due 18 Sep',8650000],['b3','PLN','Electricity · September · due 20 Sep',31200000]];
        B.push(this.hero('Bills to approve',String(BL.filter(b => !s.billOk[b[0]]).length),idr(BL.filter(b => !s.billOk[b[0]]).reduce((a,b) => a + b[3],0)) + ' awaiting approval','var(--fg-1)'));
        B.push(this.list('Supplier bills',BL.map(b => this.row(b[1],b[2],{right:idr(b[3]),pill:s.billOk[b[0]] ? 'Approved' : '',tone:'positive',btns:s.billOk[b[0]] ? [] : [this.btn('Approve',() => { self.setState(x => ({billOk:{...x.billOk,[b[0]]:true}})); self.toast('finance',b[1] + ' approved for payment · logged'); },'primary','check')]}))));
        B.push(this.blk('Note',{text:'Entering a bill and the withholding tax are on desktop.'}));
      } else if (tab === 'ar') {
        const A = [['Bank Mandiri',18400000,'0–30d','Rp 12,000,000'],['PT Telkom Indonesia',7200000,'60d+','Rp 4,000,000'],['Bali Dive Adventures',4100000,'0–30d','Rp 4,100,000'],['Kemenparekraf Events',22500000,'31–60d','Over limit']];
        B.push(this.kpis([['City ledger',idr(52200000),'billed to accounts'],['Overdue','2','accounts','var(--room-ooo)']]));
        B.push(this.list('Accounts',A.map(a => this.row(a[0],'Oldest bucket ' + a[2] + ' · ' + a[3],{right:idr(a[1]),pill:s.remind[a[0]] || s.arPaid[a[0]] ? (s.arPaid[a[0]] ? 'Payment recorded' : 'Reminded') : '',tone:'positive',btns:s.arPaid[a[0]] ? [] : [...(s.remind[a[0]] ? [] : [this.btn('Send reminder',() => { self.setState(x => ({remind:{...x.remind,[a[0]]:true}})); self.toast('finance','Reminder queued for ' + a[0]); },'secondary','mail')]),this.btn('Record payment',() => { self.setState(x => ({arPaid:{...x.arPaid,[a[0]]:true}})); self.toast('finance','Payment recorded · ' + a[0] + ' · ' + idr(a[1])); },'primary','banknote')]}))));
      } else {
        B.push(...this.auditScreen('finance',left,dirty));
      }
    } else if (role === 'nightauditor') {
      if (tab === 'audit') {
        B.push(...this.auditScreen('nightauditor',left,dirty));
      } else if (tab === 'cash') {
        B.push(...this.cashScreen('nightauditor',true));
      } else if (tab === 'folios') {
        B.push(this.hero('Open balances',idr(s.cash.filter(c => c.due).reduce((a,c) => a + c.bal,0)),s.cash.filter(c => c.due).length + ' folios to settle before the roll','var(--warning)'));
        B.push(this.list('In-house folios',s.cash.map(c => this.row(c.g,c.due ? 'Balance due · posts at audit' : 'Settled',{right:c.due ? idr(c.bal) : 'Rp 0',pill:c.due ? 'Due' : 'Settled',tone:c.due ? 'warning' : 'positive',btns:c.due ? [this.btn('Settle',() => { self.setState(x => ({cashIn:x.cashIn + c.bal,cash:x.cash.map(y => y.id === c.id ? {...y,due:false} : y)})); self.toast('nightauditor',idr(c.bal) + ' settled · ' + c.g); },'primary','banknote'),this.btn('Adjust',() => self.toast('nightauditor','Adjustment needs the reason and is logged'),'ghost','pencil')] : []}))));
      } else if (tab === 'reports') {
        B.push(this.kpis([['Revenue today',idr(19670000),'room and extras, net of tax'],['Occupancy','64%','9 of 14 rooms'],['ADR',idr(2185556),'+1.8%'],['Cash collected',idr(s.cashIn),'drawer']]));
        B.push(this.list('Day-end reports',[['Manager report','Today · by department, channel and segment'],['Cashier report','Shift 07:02 to now · by payment method'],['Trial balance','Posted today · balanced']].map(r => this.row(r[0],r[1],{btns:[this.btn('Open',() => self.toast('nightauditor','Opening ' + r[0]),'secondary','file-text'),this.btn('Share PDF',() => self.toast('nightauditor','PDF link copied'),'ghost','share-2')]}))));
      }
    } else if (role === 'hr') {
      if (tab === 'svc') {
        B.push(...this.svcScreen('hr',true));
      } else {
        const T = [['Ketut Arya','Front desk'],['Wayan Sari','Housekeeping'],['Daniel Hartono','Revenue'],['Rina Kusuma','Finance'],['Dewi Lestari','Night auditor'],['Budi','Maintenance']];
        B.push(this.alert('ai','Invite a team member',s.invited ? 'Invite link copied. It works once and expires in 7 days. Choose the role and property when they sign up.' : 'Share a one-time link. They choose a password and join with the role you set.',s.invited ? '' : 'Copy invite link',() => { self.setState({invited:true}); self.toast('hr','Invite link copied'); },'primary'));
        B.push(this.list('Team · ' + T.filter(t => !s.off[t[0]]).length + ' active',T.map(t => this.row(t[0],t[1],{pill:s.off[t[0]] ? 'Deactivated' : 'Active',tone:s.off[t[0]] ? 'neutral' : 'positive',btns:[this.btn(s.off[t[0]] ? 'Reactivate' : 'Deactivate',() => { self.setState(x => ({off:{...x.off,[t[0]]:!x.off[t[0]]}})); self.toast('hr',t[0] + (s.off[t[0]] ? ' reactivated' : ' deactivated · signed out everywhere') + ' · logged'); },s.off[t[0]] ? 'secondary' : 'ghost')]}))));
        B.push(this.blk('Note',{text:'Changing what a role can do is on desktop, in Roles and permissions.'}));
      }
    } else {
      if (tab === 'snapshot') {
        B.push(this.hero('Revenue · month to date','Rp 412,6 jt','+6.4% vs budget · 7 days closed','var(--fg-1)'));
        B.push(this.kpis([['Occupancy','71%','+2.0 pts vs LY','var(--accent-cyan)'],['RevPAR','Rp 1,120,000','+3.1% vs LY'],['ADR','Rp 1,578,000','+1.1%'],['Guest score','4.8','+0.1']]));
        B.push(this.bars('Weekly room revenue · Rp jt',[96,108,101,107],['W1','W2','W3','W4'],130));
      } else if (tab === 'revenue') {
        B.push(this.hbars('Revenue by source · MTD',[['Direct',42,'Rp 173 jt'],['Booking.com',26,'Rp 107 jt'],['Agoda',14,'Rp 58 jt'],['Expedia',10,'Rp 41 jt'],['Traveloka',8,'Rp 33 jt']]));
        B.push(this.hbars('By room type · MTD',[['Deluxe King',38,'Rp 157 jt'],['Deluxe Twin',27,'Rp 111 jt'],['Suite',22,'Rp 91 jt'],['Pool Villa',13,'Rp 54 jt']],'var(--accent-violet-hi)'));
      } else if (tab === 'digest') {
        const D = [['Weekly digest · 7 Sep','Revenue Rp 96 jt · Occupancy 71%'],['Weekly digest · 31 Aug','Revenue Rp 108 jt · Occupancy 76%'],['Monthly report · August','Revenue Rp 441 jt · RevPAR Rp 1,09 jt']];
        B.push(this.list('Reports',D.map(d => this.row(d[0],d[1],{btns:[this.btn('Open',() => self.toast('owner','Opening ' + d[0]),'secondary','file-text'),this.btn('Share',() => self.toast('owner','Share link copied'),'ghost','share-2')]}))));
      } else if (tab === 'properties') {
        const P = [['Grand Samudra Bali','Seminyak · 25 rooms','71%','Rp 412,6 jt'],['Ubud Retreat','Ubud · 18 rooms','64%','Rp 288,0 jt'],['Nusa Dua Villas','Nusa Dua · 12 villas','78%','Rp 351,4 jt']];
        B.push(this.hero('Portfolio · month to date','Rp 1,05 M','3 properties · revenue','var(--fg-1)'));
        B.push(this.list('Properties',P.map((p,i) => this.row(p[0],p[1] + ' · occupancy ' + p[2],{right:p[3],pill:i === 0 ? 'Viewing' : '',tone:'brand',btns:i === 0 ? [] : [this.btn('Switch',() => self.toast('owner','Showing ' + p[0]),'secondary','repeat')]}))));
      } else if (tab === 'approvals') {
        B.push(...this.approvalsScreen('owner',null,false));
      }
    }
    B = B.filter(b => !(b.isNote && /Nothing assigned|No open folios/.test(b.text)));
    if (role === 'frontdesk' && tab === 'today' && !left.length) B.push(this.empty('circle-check','No arrivals left','Quiet evening. The next arrival is tomorrow at 14:00.'));
    if (role === 'housekeeping' && tab === 'mine' && !dirty.length) B.push(this.empty('sparkles','All rooms are clean','Nothing assigned. Clean rooms wait for supervisor inspection.'));
    if ((role === 'finance' || role === 'frontdesk' || role === 'nightauditor') && tab === 'cash' && !s.cash.some(c => c.due)) B.push(this.empty('banknote','No open folios','Quiet evening. Every in-house balance is settled.'));
    if (role === 'gm' && tab === 'overview' && ['audit','ooo','dirty','ar'].every(k => s.acked[k])) B.push(this.empty('circle-check','All exceptions assigned','Teams have been notified. You will get a push if one escalates.'));
    if (role === 'gm' && tab === 'approvals' && ['void','refund','up','rate','ref'].every(k => s.appr[k])) B.push(this.empty('shield-check','Nothing to approve','New requests from the front desk appear here.'));
    return B;
  }
  grid(filter, tappable, role) {
    const s = this.state, self = this, next = {'Vacant Dirty':'Vacant Clean','Vacant Clean':'Inspected'};
    const rooms = Object.keys(s.hk).filter(r => filter === 'All' || s.hk[r] === filter);
    return this.blk('Grid',{cells:rooms.map(r => ({no:r,label:s.hk[r] === 'Vacant Dirty' ? 'Dirty' : s.hk[r].replace('Vacant ',''),
      style:'display:flex;flex-direction:column;gap:3px;align-items:flex-start;padding:12px;border-radius:var(--r-md);cursor:' + (tappable && next[s.hk[r]] ? 'pointer' : 'default') + ';color:var(--fg-1);background:' + this.HKW[s.hk[r]] + ';border:1px solid ' + this.HKC[s.hk[r]],
      tap:() => { if (tappable && next[s.hk[r]]) { self.setState(x => ({hk:{...x.hk,[r]:next[x.hk[r]]}})); self.toast(role,'Room ' + r + ' · ' + next[s.hk[r]]); } }}))});
  }
  renderVals() {
    const s = this.state, self = this;
    const offNow = s.offline;
    return {ctl:{offLabel:offNow ? 'Back online' : 'Go offline',errLabel:s.syncError ? 'Clear sync error' : 'Sync error',
      offStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid ' + (offNow ? 'var(--warning)' : 'rgba(238,244,255,.18)') + ';background:' + (offNow ? 'rgba(255,178,63,.16)' : 'rgba(238,244,255,.05)'),
      errStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid ' + (s.syncError ? 'var(--room-ooo)' : 'rgba(238,244,255,.18)') + ';background:' + (s.syncError ? 'rgba(255,90,122,.16)' : 'rgba(238,244,255,.05)'),
      pushStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid rgba(238,244,255,.18);background:rgba(238,244,255,.05)',
      toggleOffline:() => { if (s.offline) { const q = s.queued; self.setState({offline:false,queued:{}}); self.ROLES.forEach(r => self.setState(x => ({toasts:{...x.toasts,[r.id]:'Back online. ' + (q[r.id] || 0) + ' queued change' + ((q[r.id] || 0) === 1 ? '' : 's') + ' synced.'}}))); setTimeout(() => self.setState({toasts:{}}),2600); } else self.setState({offline:true}); },
      toggleError:() => self.setState(x => ({syncError:!x.syncError})), sendPush:() => self.sendPush()},
      themeIcon:this.state.theme === 'light' ? 'moon' : 'sun',themeLabel:this.state.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme',themeToggle:() => { const n = this.state.theme === 'light' ? 'dark' : 'light'; try { localStorage.setItem('upx_theme',n); document.documentElement.setAttribute('data-theme',n); } catch (e) {} this.setState({theme:n}); },phones:this.ROLES.map(r => { const tab = s.tab[r.id] || r.tabs[0][0], bar = this.tabsFor(r), td = bar.concat((r.more || []).map(m => [m[0],m[1],m[2]])).find(t => t[0] === tab) || r.tabs[0];
      return {helpOpen:!!s.hlp[r.id],helpToggle:() => self.setState(x => ({hlp:{...x.hlp,[r.id]:!x.hlp[r.id]}})),helpTips:(this.helpTips()[r.id] || this.helpTips().frontdesk).map(h => ({t:h[0],d:h[1]})),helpLink:'../desktop/help/' + encodeURI('Help centre.dc.html'),anchor:r.oid,oid:r.oid,href:'#' + r.oid,name:r.name,who:r.who,ini:r.ini,title:td[1] === 'Today' || td[1] === 'Overview' || td[1] === 'Snapshot' ? r.name : td[1],blocks:this.screen(r.id,tab),
        tabs:bar.map(t => ({label:t[1],icon:t[2],go:() => self.setTab(r.id,t[0]),style:'flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:6px 0;color:' + (t[0] === tab || (t[0] === 'more' && self.moreIds(r.id).includes(tab)) ? 'var(--accent-violet-hi)' : 'var(--fg-3)')})),
        hasToast:!!s.toasts[r.id],toast:s.toasts[r.id] || '',offline:s.offline,offlineText:'Offline. ' + (s.queued[r.id] || 0) + ' change' + ((s.queued[r.id] || 0) === 1 ? '' : 's') + ' queued, will sync on reconnect.',hasPush:!!s.push[r.id],pushText:s.push[r.id] ? s.push[r.id].text : '',pushGo:() => { const pu = s.push[r.id]; if (pu) { self.setTab(r.id,pu.tab); self.setState(x => { const n = {...x.push}; delete n[r.id]; return {push:n}; }); } }}; })};
  }
}


return Component;
};
