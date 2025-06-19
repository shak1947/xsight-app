/**
 * Renders the full, professional Home Page content into the #app container.
 * This version uses Tailwind CSS classes to match the design of the main Xsight marketing website.
 */
export function renderHomePage() {
    const appContainer = document.getElementById('app');
    
    // Ensure the main #app container exists before trying to modify it.
    if (!appContainer) {
        console.error("Critical Error: The #app container was not found in the DOM.");
        return;
    }

    // Set the app container's content with the new, structured HTML.
    appContainer.innerHTML = `
        <main class="home-page">
            <!-- Hero Section -->
            <section class="bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
                <div class="container mx-auto px-4 py-16 md:py-24">
                    <div class="max-w-4xl mx-auto text-center">
                        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                            Stop Juggling Multiple AI Sites
                        </h1>
                        <p class="text-lg md:text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
                            Get the best answers by comparing GPT-4, Claude, Gemini, and DeepSeek in one place. We handle the complexity, you get unified insights.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#" class="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-slate-100 transform hover:-translate-y-1 transition-all shadow-lg" data-page="signup">
                                Start Free Trial
                            </a>
                            <a href="#features" class="border-2 border-white/50 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
                                See How It Works
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section id="features" class="bg-slate-50 py-16 md:py-24">
                <div class="container mx-auto px-4">
                    <div class="text-center max-w-3xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Xsight?</h2>
                        <p class="text-lg text-slate-600">
                            Compare multiple AI models without the hassle of switching between platforms.
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        <!-- Feature 1 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Multi-Model Comparison</h3>
                            <p class="text-slate-600">Query GPT-4, Claude, Gemini, and DeepSeek simultaneously to ensure accuracy and get consensus results.</p>
                        </div>
                        <!-- Feature 2 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">One Platform, All Models</h3>
                            <p class="text-slate-600">No more switching between tabs. Access all major AI models from a single, unified and intuitive interface.</p>
                        </div>
                        <!-- Feature 3 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-crosshairs"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Better Accuracy</h3>
                            <p class="text-slate-600">Cross-reference answers from multiple models to identify the most reliable insights and catch potential errors.</p>
                        </div>
                        <!-- Feature 4 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Smart Context</h3>
                            <p class="text-slate-600">Provide background information once and get contextually relevant answers from all models without repeating yourself.</p>
                        </div>
                        <!-- Feature 5 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-lock"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Secure & Private</h3>
                            <p class="text-slate-600">Your data stays secure with enterprise-grade encryption. No data retention by AI providers.</p>
                        </div>
                        <!-- Feature 6 -->
                        <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200">
                            <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 text-2xl">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-3">Always Updated</h3>
                            <p class="text-slate-600">Automatically access the latest model versions without managing multiple subscriptions or accounts.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works Section -->
            <section class="bg-white py-16 md:py-24">
                 <div class="container mx-auto px-4">
                    <div class="text-center max-w-3xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p class="text-lg text-slate-600 mb-12">Simple, fast, and effective - get started in under 30 seconds.</p>
                    </div>
                    <div class="relative">
                        <!-- Connecting line (hidden on mobile) -->
                        <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2"></div>
                        
                        <div class="relative grid md:grid-cols-3 gap-12">
                            <!-- Step 1 -->
                            <div class="text-center">
                                <div class="relative inline-block">
                                    <div class="h-16 w-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">1</div>
                                </div>
                                <h3 class="text-xl font-bold mt-6 mb-2">Enter Your Question</h3>
                                <p class="text-slate-600">Type your question and optionally add context or upload files for better results.</p>
                            </div>
                            <!-- Step 2 -->
                            <div class="text-center">
                                 <div class="relative inline-block">
                                    <div class="h-16 w-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">2</div>
                                </div>
                                <h3 class="text-xl font-bold mt-6 mb-2">We Query All Models</h3>
                                <p class="text-slate-600">Xsight automatically sends your question to GPT-4, Claude, Gemini, and DeepSeek.</p>
                            </div>
                            <!-- Step 3 -->
                            <div class="text-center">
                                 <div class="relative inline-block">
                                    <div class="h-16 w-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center">3</div>
                                </div>
                                <h3 class="text-xl font-bold mt-6 mb-2">Get Unified Results</h3>
                                <p class="text-slate-600">Receive a consensus answer plus individual model responses for complete transparency.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>
        </main>
    `;
}
