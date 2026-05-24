export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#00ff41]/10 bg-[#060606]/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        
        <span className="text-[#00ff41] font-mono text-sm">
          ~/javierdev
        </span>

        <div className="flex gap-8">
          <a href="#about" className="text-[#7a9e7a] hover:text-[#00ff41] text-xs font-mono transition-colors">
            about()
          </a>
          <a href="#projects" className="text-[#7a9e7a] hover:text-[#00ff41] text-xs font-mono transition-colors">
            projects()
          </a>
          <a href="#contact" className="text-[#7a9e7a] hover:text-[#00ff41] text-xs font-mono transition-colors">
            contact()
          </a>
        </div>

      </div>
    </nav>
  )
}