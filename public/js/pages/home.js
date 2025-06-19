/**
 * Renders the Home Page content into the #app container.
 * This function builds a professional, responsive homepage using Tailwind CSS classes
 * that are loaded by the main index.html file.
 */
export function renderHomePage() {
    // Set the app container's content with the new, Tailwind-styled HTML.
    document.getElementById('app').innerHTML = `
        <main>
            <!-- Hero Section -->
            <section class="bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
                <div class="container mx-auto px-4 py-16 md:py-24">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <!-- Left side: Text content -->
                        <div class="text-center md:text-left">
                            <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                                Unlock the Power of Your Data with AI
                            </h1>
                            <p class="text-lg md:text-xl text-indigo-200 mb-8 max-w-xl mx-auto md:mx-0">
                                Xsight is an intelligent, no-code platform that transforms your natural language questions into powerful, precise queries. Connect your data, ask questions, and get insights in seconds.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a href="#" class="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transform hover:-translate-y-1 transition-all shadow-lg" data-page="signup">
                                    Get Started for Free
                                </a>
                                <a href="#" class="border-2 border-white/50 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors" data-page="about">
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <!-- Right side: Visual mockup -->
                        <div class="hidden md:flex justify-center">
                            <div class="w-full max-w-md bg-slate-900/30 rounded-xl shadow-2xl p-4 border border-slate-500/30 backdrop-blur-lg">
                                <div class="flex items-center gap-2 mb-4">
                                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div class="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                                    <p class="mb-2"><span class="text-blue-400">FROM</span> customers</p>
                                    <p class="mb-2"><span class="text-blue-400">WHERE</span> total_spend > <span class="text-emerald-400">500</span></p>
                                    <p class="mb-4"><span class="text-blue-400">AND</span> last_seen < <span class="text-amber-400">'3 months ago'</span></p>
                                    <div class="flex gap-3 items-start bg-slate-700/50 p-3 rounded-md border border-slate-600">
                                        <span class="text-lg">✨</span>
                                        <p class="text-slate-300">AI Suggestion: Include users from 'premium_members' for a wider reach.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="bg-white py-16 md:py-24">
                <div class="container mx-auto px-4">
                    <div class="text-center max-w-3xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Xsight?</h2>
                        <p class="text-lg text-slate-600">
                            Our platform is designed to be powerful for developers and intuitive for everyone else.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8 mt-12">
                        <!-- Feature 1 -->
                        <div class="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                                <i class="fas fa-magic text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">AI-Powered Queries</h3>
                            <p class="text-slate-600">Translate plain English into complex, accurate queries across your datasets without writing a single line of code.</p>
                        </div>
                        <!-- Feature 2 -->
                        <div class="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                                <i class="fas fa-cogs text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Seamless Integration</h3>
                            <p class="text-slate-600">Connect to databases, warehouses, and business apps you already use. Xsight works with your existing data stack.</p>
                        </div>
                        <!-- Feature 3 -->
                        <div class="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                                <i class="fas fa-chart-line text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Advanced Analytics</h3>
                            <p class="text-slate-600">Go beyond simple queries. Uncover trends, identify opportunities, and visualize your data.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Call to Action (CTA) Section -->
            <section class="bg-slate-100 py-16 md:py-24">
                <div class="container mx-auto px-4 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Dive In?</h2>
                    <p class="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Start building intelligent queries and unlock the true potential of your data today.
                    </p>
                    <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all shadow-lg" data-page="signup">
                        Sign Up Now — It's Free
                    </a>
                </div>
            </section>
        </main>
    `;

    // Note: The event listeners for the buttons (like 'Get Started') are handled by the global router in app.js
    // which listens for clicks on elements with 'data-page' attributes.
}
