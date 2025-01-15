import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a,o as e}from"./app-DS0ZCcmM.js";const n={};function l(h,i){return e(),t("div",null,i[0]||(i[0]=[a(`<h1 id="net-ntlm-v1-v2破解" tabindex="-1"><a class="header-anchor" href="#net-ntlm-v1-v2破解"><span>Net-NTLM v1/v2破解</span></a></h1><h2 id="net-ntlm-v1破解" tabindex="-1"><a class="header-anchor" href="#net-ntlm-v1破解"><span>Net-NTLM v1破解</span></a></h2><p>只要获取到Net-NTLM v1，都能破解为NTLM hash。</p><p><strong>操作</strong></p><ul><li>修改<code>Responder.conf</code>里面的Challenge为<code>1122334455667788</code></li></ul><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/chanllege.png" alt="chanllege" tabindex="0" loading="lazy"><figcaption>chanllege</figcaption></figure><ul><li><p>在responder种指定--lm参数(针对SMB协议)，其他协议需要自行修改type2，比如Http协议的话，需要修改packets.py里面的NTLM_Challenge类。原来是NegoFlags的值是<code>\\x05\\x02\\x89\\xa2</code>，改成<code>\\x05\\x02\\x81\\xa2</code></p></li><li><p>监听ntlm-v1hash</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/nossp.png" alt="nossp" tabindex="0" loading="lazy"><figcaption>nossp</figcaption></figure><p>可以发现得到的hash并没有ssp字样</p></li><li><p>使用<a href="https://github.com/evilmog/ntlmv1-multi" target="_blank" rel="noopener noreferrer">ntlmv1-multi</a>里面的ntlmv1.py转换(因为获取到的是没有ssp字样的hash)</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/ntlmv1crack.png" alt="ntlmv1crack" tabindex="0" loading="lazy"><figcaption>ntlmv1crack</figcaption></figure><p>最下方给出了可以直接使用crack.sh直接破解的hash</p></li><li><p>将转换好的hash放到crack.sh进行破解，不过网站好像一直都在维护</p></li></ul><p><strong>注意</strong>：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">测试时可以通过更改注册表将NET-NTLMv2降到NET-NTLMv1开启</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">reg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HKLM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">YSTEM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">urrentControlSet</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ontrol</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\L</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sa</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lmcompatibilitylevel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> REG_DWORD</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /f</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">reg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HKLM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">YSTEM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">urrentControlSet</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ontrol</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\L</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sa</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\M</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">SV1_0</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> NtlmMinClientSec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> REG_DWORD</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 536870912</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /f</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">reg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HKLM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">YSTEM</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">urrentControlSet</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ontrol</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\L</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sa</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\M</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">SV1_0</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> RestrictSendingNTLMTraffic</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> REG_DWORD</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /f</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>具有ssp保护措施的ntlmv1-hash</strong></p><p>捕获到之后可以直接拿到hashcat进行破解</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/withssp.png" alt="withssp" tabindex="0" loading="lazy"><figcaption>withssp</figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>hashcat -m 5500 PC$::HACK:C74588CDBA5A2DF500000000000000000000000000000000:1440E394CFEDD5139CE9E3E4900BAB542F084C7D17281F01:1122334455667788  pwd.txt</span></span>
<span class="line"><span># 将监听到的hash拿去hashcat破解，pwd.txt为密码字典</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>ntlmv1已经很少使用了，如果不自己降级为ntlmv1，使用的都是v2</p><h2 id="net-ntlm-v2破解" tabindex="-1"><a class="header-anchor" href="#net-ntlm-v2破解"><span>Net-NTLM v2破解</span></a></h2><p>暂时还没有什么破解的好方法，一般只能抓取到然后用hashcat明文离线爆破，看字典里有没有，跟我们出路ntlmv1-ssp的方式相同</p>`,16)]))}const k=s(n,[["render",l],["__file","NET-NTLM-hash破解.html.vue"]]),o=JSON.parse('{"path":"/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/NTLM%E4%B8%93%E9%A2%98/NET-NTLM-hash%E7%A0%B4%E8%A7%A3.html","title":"Net-NTLM v1/v2破解","lang":"zh-CN","frontmatter":{"description":"Net-NTLM v1/v2破解 Net-NTLM v1破解 只要获取到Net-NTLM v1，都能破解为NTLM hash。 操作 修改Responder.conf里面的Challenge为1122334455667788 chanllegechanllege 在responder种指定--lm参数(针对SMB协议)，其他协议需要自行修改type2，...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/NTLM%E4%B8%93%E9%A2%98/NET-NTLM-hash%E7%A0%B4%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"Net-NTLM v1/v2破解"}],["meta",{"property":"og:description","content":"Net-NTLM v1/v2破解 Net-NTLM v1破解 只要获取到Net-NTLM v1，都能破解为NTLM hash。 操作 修改Responder.conf里面的Challenge为1122334455667788 chanllegechanllege 在responder种指定--lm参数(针对SMB协议)，其他协议需要自行修改type2，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/chanllege.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Net-NTLM v1/v2破解\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/chanllege.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/nossp.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/ntlmv1crack.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/withssp.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"Net-NTLM v1破解","slug":"net-ntlm-v1破解","link":"#net-ntlm-v1破解","children":[]},{"level":2,"title":"Net-NTLM v2破解","slug":"net-ntlm-v2破解","link":"#net-ntlm-v2破解","children":[]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":1.32,"words":396},"filePathRelative":"渗透测试/NTLM专题/NET-NTLM-hash破解.md","localizedDate":"2025年1月16日","excerpt":"\\n<h2>Net-NTLM v1破解</h2>\\n<p>只要获取到Net-NTLM v1，都能破解为NTLM hash。</p>\\n<p><strong>操作</strong></p>\\n<ul>\\n<li>修改<code>Responder.conf</code>里面的Challenge为<code>1122334455667788</code></li>\\n</ul>\\n<figure><img src=\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/chanllege.png\\" alt=\\"chanllege\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>chanllege</figcaption></figure>","autoDesc":true}');export{k as comp,o as data};
