import { Button } from './ui/button'
import { Input } from './ui/input'
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">♔</span>
              </div>
              <span className="ml-2 text-xl font-bold">Chess.com</span>
            </div>
            <p className="text-gray-400 mb-4">
              The world's largest chess community with over 100 million members.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Play */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Play</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Online Chess</a></li>
              <li><a href="#" className="hover:text-white">Play Computer</a></li>
              <li><a href="#" className="hover:text-white">Chess Variants</a></li>
              <li><a href="#" className="hover:text-white">Tournaments</a></li>
              <li><a href="#" className="hover:text-white">Arena</a></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Learn</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Lessons</a></li>
              <li><a href="#" className="hover:text-white">Puzzles</a></li>
              <li><a href="#" className="hover:text-white">Analysis</a></li>
              <li><a href="#" className="hover:text-white">Opening Explorer</a></li>
              <li><a href="#" className="hover:text-white">Endgame Trainer</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Get the latest updates and chess news</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Chess.com. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
