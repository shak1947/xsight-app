<!-- About Page HTML Structure -->
<div class="page">
  <div class="container">
    <!-- Intro Section -->
    <section class="about-intro text-center">
      <h1>About Xsight</h1>
      <p>
        Xsight was built to make AI-powered query building intuitive, fast, and accessible to everyone.
        Whether you're a data analyst, a product manager, or an executive, our mission is to empower you with
        insights without writing a single line of code.
      </p>
    </section>

    <!-- Our Story Section -->
    <section class="about-story">
      <h2>Our Story</h2>
      <p>
        We started Xsight with a simple idea: what if understanding your data was as easy as asking a question?
        With that vision, we created a platform that blends the power of AI with a no-code interface.
        Today, we're helping teams around the world transform raw data into smart decisions.
      </p>
    </section>

    <!-- Team Section -->
    <section class="team-grid">
      <div class="team-card">
        <img src="https://via.placeholder.com/120" alt="Jane Doe" />
        <h3>Jane Doe</h3>
        <p>Co-Founder & CEO</p>
      </div>
      <div class="team-card">
        <img src="https://via.placeholder.com/120" alt="John Smith" />
        <h3>John Smith</h3>
        <p>CTO</p>
      </div>
      <div class="team-card">
        <img src="https://via.placeholder.com/120" alt="Sara Lee" />
        <h3>Sara Lee</h3>
        <p>Lead Product Designer</p>
      </div>
    </section>
  </div>
</div>

<style>
.page {
  padding: var(--spacing-3xl) 0;
}
.about-intro p {
  font-size: 1.125rem;
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
  color: var(--text-secondary);
}
.about-story {
  margin: var(--spacing-3xl) 0;
  text-align: center;
}
.about-story h2 {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}
.about-story p {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
  text-align: center;
}
.team-card {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
}
.team-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--spacing-md);
}
.team-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: 1.25rem;
}
.team-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>
