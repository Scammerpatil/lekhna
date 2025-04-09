"use client";
import Achievement from "./Achievement";
import Certification from "./Certification";
import Education from "./Education";
import Experience from "./Experience";
import PersonalDetails from "./PersonalDetails";
import Projects from "./Project";
import Skills from "./Skills";

const Profile = () => {
  return (
    <>
      <div
        role="tablist"
        className="tabs tabs-boxed tabs-lg w-full overflow-x-auto"
        style={{ width: "100%" }}
      >
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Personal Details"
          style={{ width: "200px" }}
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-hidden"
        >
          <PersonalDetails />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          style={{ width: "200px" }}
          aria-label="Achievements"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Achievement />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          style={{ width: "200px" }}
          aria-label="Certifications"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Certification />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          style={{ width: "200px" }}
          aria-label="Education"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Education />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          style={{ width: "200px" }}
          aria-label="Experience"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Experience />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          style={{ width: "200px" }}
          aria-label="Projects"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Projects />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          style={{ width: "200px" }}
          className="tab"
          aria-label="Skills"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-300 border-base-300 rounded-box p-6 max-w-6xl overflow-x-clip"
        >
          <Skills />
        </div>
      </div>
    </>
  );
};

export default Profile;
