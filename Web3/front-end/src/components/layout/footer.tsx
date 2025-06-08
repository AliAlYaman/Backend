import { Github, Twitter, DiscIcon as Discord, MessageCircle, FileText, ExternalLink, Mail, Globe } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Learn",
      links: [
        { name: "Introduction", href: "#" },
        { name: "Features", href: "#" },
        { name: "Staking", href: "#" },
        { name: "Get HEDRON", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Build",
      links: [
        { name: "Developer Portal", href: "#" },
        { name: "Ignite CLI", href: "#" },
        { name: "Cronos SDK", href: "#" },
        { name: "IBC Protocol", href: "#" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Tokens", href: "#" },
        { name: "Apps & Services", href: "#" },
        { name: "Wallets", href: "#" },
        { name: "Gravity DEX", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Participate",
      links: [
        { name: "Community", href: "#" },
        { name: "Contributors", href: "#" },
        { name: "Events", href: "#" },
        { name: "Newsletters", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "About", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Design", href: "#" },
        { name: "Resources", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Discord, href: "#", label: "Discord" },
    { icon: MessageCircle, href: "#", label: "Telegram" },
    { icon: FileText, href: "#", label: "Medium" },
    { icon: Mail, href: "#", label: "Email" },
    { icon: Globe, href: "#", label: "Website" },
    { icon: ExternalLink, href: "#", label: "Documentation" },
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-white text-lg font-semibold tracking-wide">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm leading-relaxed hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="border-t border-gray-800/50 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo and description */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="text-2xl font-bold text-white tracking-wide">CRONOS</div>
              <p className="text-gray-400 text-sm max-w-md text-center md:text-left leading-relaxed">
                The Internet of Blockchains. Building the future of decentralized finance and cross-chain
                interoperability.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="group p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-6">
              <span>© 2024 Cronos. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span>Built with</span>
              <span className="text-red-400">♥</span>
              <span>for the decentralized future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
