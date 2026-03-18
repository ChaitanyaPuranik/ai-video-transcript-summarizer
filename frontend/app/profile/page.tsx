// import Navbar from "@/components/Navbar";
// import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="page-shell">
      {/* <Navbar /> */}
      <section className="container section-spacing">
        <div className="section-heading centered">
          <p className="eyebrow">Create Profile</p>
          <h1>Set up your profile to continue</h1>
          <p className="section-text centered-text">
            Enter your name and email to access the dashboard and start generating transcripts.
          </p>
        </div>

        {/* <ProfileForm /> */}
      </section>
    </main>
  );
}