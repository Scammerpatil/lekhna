import React from "react";

const ContactPage: React.FC = () => {
  return (
    <section className="bg-base-200 py-12 h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-base-100 shadow-xl p-8 rounded-lg">
        <h2 className="text-3xl font-extrabold text-base-content text-center mb-6">
          Contact Us
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-base-content mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-base-content mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-base-content mb-1 font-medium">Message</label>
            <textarea
              placeholder="Enter your message"
              className="textarea textarea-bordered w-full h-32"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
