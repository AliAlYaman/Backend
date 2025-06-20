import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Cloud,
  Server,
  Zap,
  Shield,
  Globe,
  Database,
  Network,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Cpu,
  Activity,
  Users,
} from "lucide-react"

export default function AWSShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/15 to-red-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Secondary dynamic elements */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-600/10 to-yellow-500/10 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-full blur-2xl animate-pulse delay-3000"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-slate-950/90 backdrop-blur-sm border-b border-orange-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cloud className="h-8 w-8 text-orange-500 animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-full blur-md animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
                AWS Cloud Solutions
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="text-gray-300 hover:text-orange-400 transition-all duration-500 hover:scale-110 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#benefits"
                className="text-gray-300 hover:text-orange-400 transition-all duration-500 hover:scale-110 relative group"
              >
                Benefits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-orange-400 transition-all duration-500 hover:scale-110 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 hover:from-orange-500/30 hover:to-amber-500/30 border-orange-500/40 animate-pulse hover:animate-bounce transition-all duration-300">
            ☁️ Cloud Computing Excellence
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Harness the Power of
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent animate-pulse">
              AWS Cloud Computing
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your business with scalable, secure, and cost-effective cloud solutions. From EC2 instances to
            serverless architectures, discover how AWS can accelerate your digital transformation.
          </p>

          {/* About This Project Section */}
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>

              {/* Main content card */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-orange-500/40 rounded-xl p-8 shadow-2xl backdrop-blur-sm group-hover:border-orange-400/60 transition-all duration-500">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-lg border border-orange-500/40 group-hover:animate-pulse">
                    <Cpu className="h-6 w-6 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    About This Project
                  </h2>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  This website is built as a comprehensive learning project to explore AWS services, especially
                  deploying and managing EC2 instances. The goal is to gain hands-on experience with AWS infrastructure,
                  deployment, and industry best practices.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-orange-300 flex items-center space-x-2">
                      <Server className="h-5 w-5" />
                      <span>Learning Objectives</span>
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Deploy and manage EC2 instances</span>
                      </li>
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Experiment with AWS cloud features</span>
                      </li>
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Learn scalable architectures</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-orange-300 flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Key Focus Areas</span>
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Security best practices</span>
                      </li>
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Cost optimization strategies</span>
                      </li>
                      <li className="flex items-center space-x-2 group-hover:text-gray-300 transition-colors">
                        <CheckCircle className="h-4 w-4 text-green-400 animate-pulse" />
                        <span>Performance monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-orange-500/20">
                  <Badge className="bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border-orange-500/40 hover:from-orange-400/40 hover:to-amber-400/40 hover:scale-105 transition-all duration-300">
                    🎓 Educational Project
                  </Badge>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    For demonstration and learning purposes
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white shadow-2xl hover:shadow-orange-500/40 transform hover:scale-110 transition-all duration-500 animate-pulse hover:animate-none"
            >
              Explore Services <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-slate-900/50 text-white border-orange-500/60 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-amber-500/20 hover:border-orange-400 backdrop-blur-sm transform hover:scale-110 transition-all duration-500"
            >
              Get Consultation
            </Button>
          </div>

          {/* Dynamic Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:transform hover:scale-110 hover:rotate-1 group">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-orange-400 animate-pulse group-hover:animate-bounce" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                99.99%
              </div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:transform hover:scale-110 hover:-rotate-1 group">
              <div className="flex items-center justify-center mb-2">
                <Globe
                  className="h-8 w-8 text-orange-400 animate-spin group-hover:animate-pulse"
                  style={{ animationDuration: "8s" }}
                />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                31+
              </div>
              <div className="text-gray-400">Global Regions</div>
            </div>
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:transform hover:scale-110 hover:rotate-1 group">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-orange-400 animate-pulse group-hover:animate-bounce" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                1M+
              </div>
              <div className="text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 bg-gradient-to-b from-slate-900/60 to-slate-950/60 backdrop-blur-sm relative"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-6">
              AWS Services Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cloud solutions tailored to meet your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* EC2 */}
            <Card className="group hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-700 border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-700/70 transform hover:scale-105 hover:-translate-y-3 hover:rotate-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-xl group-hover:from-orange-400/40 group-hover:to-amber-500/40 transition-all duration-500 border border-orange-500/40 group-hover:border-orange-400/60 group-hover:animate-pulse">
                    <Server className="h-8 w-8 text-orange-400 group-hover:text-orange-300 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-amber-300 transition-all duration-300">
                      Amazon EC2
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300">
                      Elastic Compute Cloud
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Secure and resizable compute capacity in the cloud. Launch virtual servers in minutes with complete
                  control over computing resources.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">On-demand scaling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Multiple instance types</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Pay-as-you-use pricing</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border-orange-500/40 hover:from-orange-400/40 hover:to-amber-400/40 hover:scale-110 transition-all duration-300">
                    Compute
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border-orange-500/40 hover:from-orange-400/40 hover:to-amber-400/40 hover:scale-110 transition-all duration-300">
                    Scalable
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-300 border-orange-500/40 hover:from-orange-400/40 hover:to-amber-400/40 hover:scale-110 transition-all duration-300">
                    Flexible
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Elastic Load Balancer */}
            <Card className="group hover:shadow-2xl hover:shadow-slate-600/30 transition-all duration-700 border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-700/70 transform hover:scale-105 hover:-translate-y-3 hover:-rotate-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-slate-700/40 to-slate-600/40 rounded-xl group-hover:from-slate-600/50 group-hover:to-slate-500/50 transition-all duration-500 border border-slate-600/40 group-hover:border-slate-500/60 group-hover:animate-pulse">
                    <Network className="h-8 w-8 text-slate-300 group-hover:text-slate-200 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-300">
                      Elastic Load Balancer
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300">
                      Distribute Traffic Efficiently
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Automatically distribute incoming application traffic across multiple targets, ensuring high
                  availability and fault tolerance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">High availability</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Auto scaling integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">SSL/TLS termination</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-slate-600/30 to-slate-500/30 text-slate-300 border-slate-500/40 hover:from-slate-500/40 hover:to-slate-400/40 hover:scale-110 transition-all duration-300">
                    Load Balancing
                  </Badge>
                  <Badge className="bg-gradient-to-r from-slate-600/30 to-slate-500/30 text-slate-300 border-slate-500/40 hover:from-slate-500/40 hover:to-slate-400/40 hover:scale-110 transition-all duration-300">
                    High Availability
                  </Badge>
                  <Badge className="bg-gradient-to-r from-slate-600/30 to-slate-500/30 text-slate-300 border-slate-500/40 hover:from-slate-500/40 hover:to-slate-400/40 hover:scale-110 transition-all duration-300">
                    Security
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Serverless */}
            <Card className="group hover:shadow-2xl hover:shadow-purple-600/30 transition-all duration-700 border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-700/70 transform hover:scale-105 hover:-translate-y-3 hover:rotate-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-xl group-hover:from-purple-500/40 group-hover:to-purple-600/40 transition-all duration-500 border border-purple-600/40 group-hover:border-purple-500/60 group-hover:animate-pulse">
                    <Zap className="h-8 w-8 text-purple-400 group-hover:text-purple-300 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-purple-400 transition-all duration-300">
                      Serverless Computing
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300">
                      AWS Lambda & More
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Run code without provisioning or managing servers. Pay only for compute time consumed with automatic
                  scaling and built-in high availability.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Zero server management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Automatic scaling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Pay per execution</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-300 border-purple-600/40 hover:from-purple-500/40 hover:to-purple-600/40 hover:scale-110 transition-all duration-300">
                    Serverless
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-300 border-purple-600/40 hover:from-purple-500/40 hover:to-purple-600/40 hover:scale-110 transition-all duration-300">
                    Cost-Effective
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-300 border-purple-600/40 hover:from-purple-500/40 hover:to-purple-600/40 hover:scale-110 transition-all duration-300">
                    Event-Driven
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* EKS */}
            <Card className="group hover:shadow-2xl hover:shadow-cyan-600/30 transition-all duration-700 border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-700/70 transform hover:scale-105 hover:-translate-y-3 hover:-rotate-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-600/30 to-cyan-700/30 rounded-xl group-hover:from-cyan-500/40 group-hover:to-cyan-600/40 transition-all duration-500 border border-cyan-600/40 group-hover:border-cyan-500/60 group-hover:animate-pulse">
                    <Database
                      className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 group-hover:animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-cyan-400 transition-all duration-300">
                      Amazon EKS
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300">
                      Elastic Kubernetes Service
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Fully managed Kubernetes service that makes it easy to deploy, manage, and scale containerized
                  applications using Kubernetes on AWS.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Managed Kubernetes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Container orchestration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 animate-pulse group-hover:animate-bounce" />
                    <span className="text-gray-300 group-hover:text-gray-200">Multi-AZ deployment</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 text-cyan-300 border-cyan-600/40 hover:from-cyan-500/40 hover:to-cyan-600/40 hover:scale-110 transition-all duration-300">
                    Kubernetes
                  </Badge>
                  <Badge className="bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 text-cyan-300 border-cyan-600/40 hover:from-cyan-500/40 hover:to-cyan-600/40 hover:scale-110 transition-all duration-300">
                    Containers
                  </Badge>
                  <Badge className="bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 text-cyan-300 border-cyan-600/40 hover:from-cyan-500/40 hover:to-cyan-600/40 hover:scale-110 transition-all duration-300">
                    Orchestration
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-4 bg-gradient-to-b from-slate-950/60 to-slate-900/60 backdrop-blur-sm relative"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-6">
              Why Choose AWS Cloud?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the advantages of world-class cloud infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-110 hover:rotate-1 transition-all duration-500">
              <div className="relative p-6 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-orange-500/40 group-hover:border-orange-400/60 group-hover:from-orange-400/40 group-hover:to-amber-500/40">
                <Shield className="h-12 w-12 text-orange-400 group-hover:text-orange-300 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl group-hover:from-orange-400/30 group-hover:to-amber-400/30 transition-all duration-500 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-amber-300 transition-all duration-300 mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Bank-level security with encryption, compliance certifications, and advanced threat protection.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-110 hover:-rotate-1 transition-all duration-500">
              <div className="relative p-6 bg-gradient-to-br from-slate-700/40 to-slate-600/40 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-slate-600/40 group-hover:border-slate-500/60 group-hover:from-slate-600/50 group-hover:to-slate-500/50">
                <BarChart3 className="h-12 w-12 text-slate-300 group-hover:text-slate-200 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-full blur-xl group-hover:from-slate-500/30 group-hover:to-slate-400/30 transition-all duration-500 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-slate-200 group-hover:to-slate-400 transition-all duration-300 mb-4">
                Cost Optimization
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Pay only for what you use with flexible pricing models and cost management tools.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-110 hover:rotate-1 transition-all duration-500">
              <div className="relative p-6 bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-purple-600/40 group-hover:border-purple-500/60 group-hover:from-purple-500/40 group-hover:to-purple-600/40">
                <Globe
                  className="h-12 w-12 text-purple-400 group-hover:text-purple-300 group-hover:animate-spin"
                  style={{ animationDuration: "4s" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded-full blur-xl group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-500 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-purple-400 transition-all duration-300 mb-4">
                Global Reach
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Deploy applications worldwide with 99+ availability zones across 31+ regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-b from-slate-900/60 to-slate-950 backdrop-blur-sm relative"
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to transform your business with AWS? Let's discuss your cloud journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-8">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group hover:transform hover:scale-105 hover:rotate-1 transition-all duration-500">
                      <div className="p-4 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-xl border border-orange-500/40 group-hover:border-orange-400/60 group-hover:from-orange-400/40 group-hover:to-amber-500/40 group-hover:animate-pulse">
                        <Phone className="h-6 w-6 text-orange-400 group-hover:text-orange-300 group-hover:animate-bounce" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg group-hover:text-orange-200 transition-colors duration-300">
                          Phone
                        </p>
                        <p className="text-gray-300 group-hover:text-gray-200">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group hover:transform hover:scale-105 hover:-rotate-1 transition-all duration-500">
                      <div className="p-4 bg-gradient-to-br from-slate-700/40 to-slate-600/40 rounded-xl border border-slate-600/40 group-hover:border-slate-500/60 group-hover:from-slate-600/50 group-hover:to-slate-500/50 group-hover:animate-pulse">
                        <Mail className="h-6 w-6 text-slate-300 group-hover:text-slate-200 group-hover:animate-bounce" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg group-hover:text-slate-200 transition-colors duration-300">
                          Email
                        </p>
                        <p className="text-gray-300 group-hover:text-gray-200">contact@awscloudexpert.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group hover:transform hover:scale-105 hover:rotate-1 transition-all duration-500">
                      <div className="p-4 bg-gradient-to-br from-purple-600/30 to-purple-700/30 rounded-xl border border-purple-600/40 group-hover:border-purple-500/60 group-hover:from-purple-500/40 group-hover:to-purple-600/40 group-hover:animate-pulse">
                        <MapPin className="h-6 w-6 text-purple-400 group-hover:text-purple-300 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg group-hover:text-purple-200 transition-colors duration-300">
                          Location
                        </p>
                        <p className="text-gray-300 group-hover:text-gray-200">
                          Available for remote consultations worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-900/60 to-slate-800/60 p-8 rounded-xl border border-orange-500/30 backdrop-blur-sm hover:border-orange-500/50 hover:from-slate-800/70 hover:to-slate-700/70 transition-all duration-500 group">
                  <div className="flex items-center space-x-3 mb-4">
                    <Cpu className="h-6 w-6 text-orange-400 animate-pulse group-hover:animate-bounce" />
                    <h4 className="font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent text-lg group-hover:from-orange-300 group-hover:to-amber-300">
                      AWS Certified Professional
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    With extensive experience in cloud architecture and AWS services, I help businesses leverage the
                    full potential of cloud computing for scalable, secure, and cost-effective solutions.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-2xl border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-700/70 transition-all duration-500 group">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-amber-300">
                    Send a Message
                  </CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-gray-300">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-500 hover:bg-slate-700/60"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-500 hover:bg-slate-700/60"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-500 hover:bg-slate-700/60"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-500 hover:bg-slate-700/60"
                      placeholder="AWS Consultation Request"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-500 hover:bg-slate-700/60"
                      placeholder="Tell me about your project and how I can help..."
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white shadow-2xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-500 py-3 group">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-orange-500/30 py-12 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Cloud className="h-8 w-8 text-orange-400 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              AWS Cloud Solutions
            </span>
          </div>
          <p className="text-gray-400 mb-6 text-lg">
            Empowering businesses with scalable cloud infrastructure and expert AWS consulting.
          </p>
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <span>© 2024 AWS Cloud Expert</span>
            <span className="text-orange-500 animate-pulse">•</span>
            <span>Professional Cloud Consulting</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
