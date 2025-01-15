import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a as r,o as n}from"./app-DS0ZCcmM.js";const s={};function p(o,e){return n(),t("div",null,e[0]||(e[0]=[r('<h1 id="认识k8s" tabindex="-1"><a class="header-anchor" href="#认识k8s"><span>认识k8s</span></a></h1><p>docker --&gt; 单机</p><p>k8s --&gt; 多机管理</p><h2 id="k8s的需求" tabindex="-1"><a class="header-anchor" href="#k8s的需求"><span>K8S的需求</span></a></h2><p>传统部署 :无法做到环境隔离</p><p>|</p><p>虚拟化部署:实现了环境隔离，但是资源占用大，启动速度慢</p><p>|</p><p>容器化部署(docker):实现了环境隔离，由于命名空间等技术的利用，资源分配合理，启动速度较快，但是存在寿命周期短，需要经常重启的情况</p><p>|</p><p>K8S：由于容器的寿命比较短暂，需要经常调试环境，而重新打包部署容器比较麻烦，又会存在一系列问题，包括但不限于网络，数据同步等，因此才有了K8S来对容器进行部署和管理</p><h2 id="k8s的特点" tabindex="-1"><a class="header-anchor" href="#k8s的特点"><span>K8S的特点</span></a></h2><p>自我修复：对容器进行监测，出现问题就在原有无问题容器基础上进行复制启动，出现问题的容器进行抛弃(也可能是重启?)</p><p>弹性伸缩：容器数量的控制</p><p>自动部署和回滚：通过配置文件进行自动的容器构建，对容器的回滚更新</p><p>服务发现和负载均衡：默认方案</p><p>机密和配置管理：对敏感数据或其他进行配置管理</p><p>存储编排：虚拟磁盘与物理磁盘</p><p>批处理：批量任务实现</p><h2 id="k8s组件" tabindex="-1"><a class="header-anchor" href="#k8s组件"><span>K8S组件</span></a></h2><h3 id="master组件" tabindex="-1"><a class="header-anchor" href="#master组件"><span>Master组件</span></a></h3><p>Master组件是集群的控制平台</p><ul><li>master 组件负责集群中的全局决策（例如，调度）</li><li>master 组件探测并响应集群事件（例如，当 Deployment 的实际 Pod 副本数未达到 <code>replicas</code> 字段的规定时，启动一个新的 Pod）</li></ul><h4 id="kube-apiserver" tabindex="-1"><a class="header-anchor" href="#kube-apiserver"><span>kube-apiserver</span></a></h4><p>此 master 组件提供 Kubernetes API。这是Kubernetes控制平台的前端（front-end）</p><p>kubectl / kubernetes dashboard / kuboard 等Kubernetes管理工具就是通过 kubernetes API 实现对 Kubernetes 集群的管理。</p><h4 id="etcd" tabindex="-1"><a class="header-anchor" href="#etcd"><span>etcd</span></a></h4><p>etcd 是 Kubernetes 的核心组件之一，它是一个开源的分布式统一键值存储系统，用于分布式系统或计算机集群的共享配置、服务发现和的调度协调。etcd 通过 Raft 一致性算法处理日志复制以保证强一致性。Kubernetes 的所有集群数据都可以保存在 etcd 中。</p><h4 id="kube-scheduler" tabindex="-1"><a class="header-anchor" href="#kube-scheduler"><span>kube-scheduler</span></a></h4><p>此 master 组件监控所有新创建尚未分配到节点上的 Pod，并且自动选择为 Pod 选择一个合适的节点去运行</p><h4 id="kube-controller-manager" tabindex="-1"><a class="header-anchor" href="#kube-controller-manager"><span>kube-controller-manager</span></a></h4><p>此 master 组件运行了所有的控制器</p><p>逻辑上来说，每一个控制器是一个独立的进程，但是为了降低复杂度，这些控制器都被合并运行在一个进程里。</p><p>kube-controller-manager 中包含的控制器有：</p><ul><li>节点控制器： 负责监听节点停机的事件并作出对应响应</li><li>副本控制器： 负责为集群中每一个 副本控制器对象（Replication Controller Object）维护期望的 Pod 副本数</li><li>端点（Endpoints）控制器：负责为端点对象（Endpoints Object，连接 Service 和 Pod）赋值</li><li>Service Account &amp; Token控制器： 负责为新的名称空间创建 default Service Account 以及 API Access Token</li></ul><h4 id="cloud-controller-manager" tabindex="-1"><a class="header-anchor" href="#cloud-controller-manager"><span>cloud-controller-manager</span></a></h4><p>cloud-controller-manager 中运行了与具体云基础设施供应商互动的控制器。（默认不安装）</p><h3 id="node组件" tabindex="-1"><a class="header-anchor" href="#node组件"><span>Node组件</span></a></h3><p>Node 组件运行在每一个节点上（包括 master 节点和 worker 节点），负责维护运行中的 Pod 并提供 Kubernetes 运行时环境。</p><h4 id="kubelet" tabindex="-1"><a class="header-anchor" href="#kubelet"><span>kubelet</span></a></h4><p>每个节点上都存在的代理程序，用来确保pod中的容器处于运行状态。也就是自动检测的功能，Kubelet不管理不是通过 Kubernetes 创建的容器。</p><h4 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy"><span>kube-proxy</span></a></h4><p>每个节点上都存在的网络代理程序，是实现 Kubernetes Service 概念的重要部分。</p><p>kube-proxy 在节点上维护网络规则。这些网络规则使得您可以在集群内、集群外正确地与 Pod 进行网络通信。</p><h4 id="容器引擎" tabindex="-1"><a class="header-anchor" href="#容器引擎"><span>容器引擎</span></a></h4><p>负责运行容器</p><h3 id="addons" tabindex="-1"><a class="header-anchor" href="#addons"><span>Addons</span></a></h3><p>Addons 使用 Kubernetes 资源（DaemonSet、Deployment等）实现集群的功能特性。由于他们提供集群级别的功能特性，addons使用到的Kubernetes资源都放置在 <code>kube-system</code> 名称空间下。</p><h4 id="dns" tabindex="-1"><a class="header-anchor" href="#dns"><span>DNS</span></a></h4><p>除了DNS Addon ，k8s集群还必须包含Cluster DNS.</p><p>Cluster DNS 是一个 DNS 服务器，是对您已有环境中其他 DNS 服务器的一个补充，存放了 Kubernetes Service 的 DNS 记录。</p><p>WEB UI(Dashboard)</p><p>集群的图形化管理界面</p>',53)]))}const c=a(s,[["render",p],["__file","认识K8s.html.vue"]]),i=JSON.parse('{"path":"/%E4%BA%91/K8S/%E8%AE%A4%E8%AF%86K8s.html","title":"认识k8s","lang":"zh-CN","frontmatter":{"description":"认识k8s docker --> 单机 k8s --> 多机管理 K8S的需求 传统部署 :无法做到环境隔离 | 虚拟化部署:实现了环境隔离，但是资源占用大，启动速度慢 | 容器化部署(docker):实现了环境隔离，由于命名空间等技术的利用，资源分配合理，启动速度较快，但是存在寿命周期短，需要经常重启的情况 | K8S：由于容器的寿命比较短暂，需要经...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/%E4%BA%91/K8S/%E8%AE%A4%E8%AF%86K8s.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"认识k8s"}],["meta",{"property":"og:description","content":"认识k8s docker --> 单机 k8s --> 多机管理 K8S的需求 传统部署 :无法做到环境隔离 | 虚拟化部署:实现了环境隔离，但是资源占用大，启动速度慢 | 容器化部署(docker):实现了环境隔离，由于命名空间等技术的利用，资源分配合理，启动速度较快，但是存在寿命周期短，需要经常重启的情况 | K8S：由于容器的寿命比较短暂，需要经..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"认识k8s\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"K8S的需求","slug":"k8s的需求","link":"#k8s的需求","children":[]},{"level":2,"title":"K8S的特点","slug":"k8s的特点","link":"#k8s的特点","children":[]},{"level":2,"title":"K8S组件","slug":"k8s组件","link":"#k8s组件","children":[{"level":3,"title":"Master组件","slug":"master组件","link":"#master组件","children":[]},{"level":3,"title":"Node组件","slug":"node组件","link":"#node组件","children":[]},{"level":3,"title":"Addons","slug":"addons","link":"#addons","children":[]}]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":3.63,"words":1090},"filePathRelative":"云/K8S/认识K8s.md","localizedDate":"2025年1月16日","excerpt":"\\n<p>docker  --&gt; 单机</p>\\n<p>k8s --&gt; 多机管理</p>\\n<h2>K8S的需求</h2>\\n<p>传统部署 :无法做到环境隔离</p>\\n<p>|</p>\\n<p>虚拟化部署:实现了环境隔离，但是资源占用大，启动速度慢</p>\\n<p>|</p>\\n<p>容器化部署(docker):实现了环境隔离，由于命名空间等技术的利用，资源分配合理，启动速度较快，但是存在寿命周期短，需要经常重启的情况</p>\\n<p>|</p>\\n<p>K8S：由于容器的寿命比较短暂，需要经常调试环境，而重新打包部署容器比较麻烦，又会存在一系列问题，包括但不限于网络，数据同步等，因此才有了K8S来对容器进行部署和管理</p>","autoDesc":true}');export{c as comp,i as data};
