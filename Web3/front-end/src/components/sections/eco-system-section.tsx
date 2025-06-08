import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

export function EcosystemSection() {
    return (
        <section className="py-20 px-4 sm:px-8 bg-black min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full flex justify-center"> {/* ← centers the grid container */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-items-center"> {/* ← added justify-items-center */}
                    {/* Left Content */}
                    <div className="relative text-center"> {/* ← removed lg:text-left to keep it centered */}
                        {/* 3D S Shape */}
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 rounded-3xl transform rotate-12 shadow-2xl">
                            <div className="absolute -left-8 top-0 w-32 h-48 opacity-80">
                                <div className="absolute inset-2 bg-gradient-to-tl from-purple-500 via-blue-400 to-purple-500 rounded-2xl">
                                    <div className="absolute inset-4 bg-black rounded-xl opacity-20"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8">
                            <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-4 sm:mb-6">
                                Community-owned and operated
                            </p>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                                Enter a Universe of Connected Services.
                            </h2>

                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 mx-auto max-w-lg">
                                Cronos apps and services connect using IBC, the Inter-Blockchain Communication protocol. This innovation
                                enables you to freely exchange assets and data across sovereign.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="default" className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 py-3">
                                    Learn
                                </Button>
                                <Button variant="ghost" className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3">
                                    <span>Explore Tokens</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Stats */}
                    <div className="flex flex-col space-y-8 sm:space-y-12 mt-12 lg:mt-0 text-center"> {/* ← text-center instead of lg:text-left */}
                        <div>
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2">265+</div>
                            <p className="text-gray-400 text-base sm:text-lg">Apps & services</p>
                        </div>

                        <div>
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2">$63B+</div>
                            <p className="text-gray-400 text-base sm:text-lg">Digital assets</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

