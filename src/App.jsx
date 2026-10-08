import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const [queryName, setQueryName] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  const [queryText, setQueryText] = useState("");

  const [savedQueries, setSavedQueries] = useState([]);
  const [showQueries, setShowQueries] = useState(false);

  const submitQuery = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: queryName,
          email: queryEmail,
          query: queryText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Your query has been submitted successfully.");

        setQueryName("");
        setQueryEmail("");
        setQueryText("");
      } else {
        alert(data.message || "Unable to submit query.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to submit query. Please try again.");
    }
  };

  const fetchQueries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/queries");
      const data = await response.json();

      if (response.ok) {
        setSavedQueries(data);
        setShowQueries(true);
      } else {
        alert("Unable to fetch queries.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  };

  const searchCyberSafety = () => {
    const term = searchTerm.toLowerCase().trim();

    if (term.includes("phishing")) {
      setSearchResult(
        "Phishing is a cyber scam where fake messages, emails or websites are used to trick users into sharing sensitive information."
      );
    } else if (term.includes("otp")) {
      setSearchResult(
        "Never share your OTP with anyone. An OTP should only be used by you for the intended transaction or login."
      );
    } else if (term.includes("upi")) {
      setSearchResult(
        "For safer UPI payments, verify the receiver and payment request before completing a transaction."
      );
    } else if (term.includes("fake") || term.includes("website")) {
      setSearchResult(
        "Check the website address carefully before entering personal information. Avoid suspicious or unknown links."
      );
    } else if (term.includes("social")) {
      setSearchResult(
        "Use privacy settings, strong passwords and two-factor authentication to improve social media security."
      );
    } else if (term === "") {
      setSearchResult("Please enter a cyber safety topic to search.");
    } else {
      setSearchResult(
        "No specific topic found. Try searching for phishing, OTP, UPI, fake website or social media."
      );
    }
  };

  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          🛡️ Cyber Assist
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#threats">Threats</a>
          <a href="#tips">Safety Tips</a>
          <a href="#helpdesk">Helpdesk</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">COMMUNITY CYBER SAFETY</p>

          <h1>
            Stay Safe in the
            <span> Digital World.</span>
          </h1>

          <p className="hero-text">
            Cyber Assist is a simple community helpdesk that helps users
            understand common cyber threats, scams and basic online safety
            practices.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Safety
            </button>

            <button className="secondary-btn">
              Visit Helpdesk
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="shield">🛡️</div>
          <h2>Your Safety Matters</h2>
          <p>
            Learn how to identify common online threats and protect yourself.
          </p>
        </div>
      </section>
            {/* Cyber Safety Search */}
      <section className="search-section" id="search">

        <p className="section-label">CYBER SAFETY SEARCH</p>

        <h2>What do you want to know?</h2>

        <p className="section-description">
          Search for common cyber safety topics and get simple guidance.
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search e.g. phishing, OTP, UPI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCyberSafety();
              }
            }}
          />

          <button
            className="primary-btn"
            onClick={searchCyberSafety}
          >
            Search
          </button>

        </div>

        {searchResult && (
          <div className="search-result">
            <h3>Safety Information</h3>
            <p>{searchResult}</p>
          </div>
        )}

      </section>

            {/* Cyber Threats Overview */}
      <section className="section" id="threats">

        <p className="section-label">CYBER THREATS</p>

        <h2>Understand the Threats</h2>

        <p className="section-description">
          Learn about common cyber threats and understand how they can
          affect your digital safety.
        </p>

        <div className="cards">

          <div className="card">
            <div className="card-icon">🎣</div>
            <h3>Phishing</h3>
            <p>
              Fake messages, emails or websites designed to trick users
              into sharing sensitive information.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">📱</div>
            <h3>OTP Scams</h3>
            <p>
              Scams where attackers try to obtain one-time passwords
              from users.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">💳</div>
            <h3>UPI Fraud</h3>
            <p>
              Fraud involving fake payment requests, links or misleading
              UPI transactions.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🌐</div>
            <h3>Fake Websites</h3>
            <p>
              Suspicious websites created to imitate trusted websites
              and collect user information.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">📲</div>
            <h3>Social Media Scams</h3>
            <p>
              Scams using social media messages, fake accounts and
              misleading offers.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🛒</div>
            <h3>Online Shopping Scams</h3>
            <p>
              Fraudulent shopping websites, fake offers and misleading
              online sellers.
            </p>
          </div>

        </div>

      </section>
            {/* Phishing Awareness */}
      <section className="awareness-section" id="phishing">

        <div className="awareness-content">

          <div className="awareness-text">

            <p className="section-label">THREAT AWARENESS</p>

            <h2>Phishing Awareness</h2>

            <p>
              Phishing is a cyber scam where attackers use fake messages,
              emails or websites to trick people into sharing sensitive
              information.
            </p>

            <h3>Common Warning Signs</h3>

            <ul className="warning-list">
              <li>⚠️ Unexpected messages asking for personal information</li>
              <li>⚠️ Suspicious or unknown links</li>
              <li>⚠️ Messages creating unnecessary urgency</li>
              <li>⚠️ Requests for passwords, OTPs or banking information</li>
            </ul>

          </div>

          <div className="awareness-card">

            <div className="awareness-icon">🎣</div>

            <h3>Before You Click</h3>

            <p>
              Stop and verify the sender, check the website address and
              avoid entering sensitive information on suspicious pages.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  "Safety Reminder: Never share your OTP, password or banking information through suspicious links or messages."
                )
              }
            >
              Safety Reminder
            </button>

          </div>

        </div>

      </section>
            {/* OTP Scam Awareness */}
      <section className="otp-section" id="otp">

        <div className="otp-content">

          <div className="otp-card">
            <div className="otp-icon">📱</div>
            <h3>OTP Safety</h3>
            <p>
              Your OTP is private. Never share it with unknown callers,
              messages or websites.
            </p>
          </div>

          <div className="otp-text">

            <p className="section-label">OTP SCAM AWARENESS</p>

            <h2>Protect Your One-Time Password</h2>

            <p>
              Scammers may try to convince users to share an OTP by
              pretending to be from a bank, company or trusted service.
            </p>

            <div className="otp-points">
              <div>
                <strong>01</strong>
                <span>Never share your OTP with another person.</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Do not enter OTPs on suspicious websites.</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Read the message carefully before using an OTP.</span>
              </div>

              <div>
                <strong>04</strong>
                <span>If something looks suspicious, stop and verify.</span>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  "OTP Safety: Never share your OTP with anyone, even if they claim to be from a trusted organisation."
                )
              }
            >
              OTP Safety Reminder
            </button>

          </div>

        </div>

      </section>
            {/* UPI Fraud Awareness */}
      <section className="upi-section" id="upi">

        <div className="upi-content">

          <div className="upi-text">

            <p className="section-label">UPI FRAUD AWARENESS</p>

            <h2>Stay Safe While Using UPI</h2>

            <p>
              Digital payments are convenient, but users should verify
              payment requests carefully and avoid sharing sensitive
              information.
            </p>

            <div className="upi-points">

              <div className="upi-point">
                <span>🔍</span>
                <div>
                  <h3>Verify the Receiver</h3>
                  <p>Check the receiver details before completing a payment.</p>
                </div>
              </div>

              <div className="upi-point">
                <span>🔐</span>
                <div>
                  <h3>Protect Your UPI PIN</h3>
                  <p>Never share your UPI PIN with another person.</p>
                </div>
              </div>

              <div className="upi-point">
                <span>⚠️</span>
                <div>
                  <h3>Be Careful With Requests</h3>
                  <p>Review unexpected payment requests before accepting them.</p>
                </div>
              </div>

              <div className="upi-point">
                <span>📱</span>
                <div>
                  <h3>Use Trusted Apps</h3>
                  <p>Use official and trusted payment applications.</p>
                </div>
              </div>

            </div>

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  "UPI Safety Reminder: Verify payment details and never share your UPI PIN with anyone."
                )
              }
            >
              UPI Safety Reminder
            </button>

          </div>

          <div className="upi-card">
            <div className="upi-card-icon">💳</div>
            <h3>Think Before You Pay</h3>
            <p>
              Always verify the payment details before approving a
              transaction.
            </p>
          </div>

        </div>

      </section>
            {/* Fake Website Awareness */}
      <section className="fake-site-section" id="fake-websites">

        <div className="fake-site-content">

          <div className="fake-site-card">
            <div className="fake-site-icon">🌐</div>
            <h3>Check Before You Trust</h3>
            <p>
              A professional-looking website is not always a genuine
              website. Always verify the website address before sharing
              personal information.
            </p>
          </div>

          <div className="fake-site-text">

            <p className="section-label">FAKE WEBSITE AWARENESS</p>

            <h2>Can You Recognize a Fake Website?</h2>

            <p>
              Fake websites may imitate trusted services and can be
              designed to collect personal or financial information.
            </p>

            <div className="website-checks">

              <div className="website-check">
                <span>01</span>
                <div>
                  <h3>Check the Website Address</h3>
                  <p>
                    Look carefully for unusual spelling or suspicious
                    website addresses.
                  </p>
                </div>
              </div>

              <div className="website-check">
                <span>02</span>
                <div>
                  <h3>Be Careful With Unknown Links</h3>
                  <p>
                    Avoid opening links from unexpected messages or
                    unknown sources.
                  </p>
                </div>
              </div>

              <div className="website-check">
                <span>03</span>
                <div>
                  <h3>Do Not Rush</h3>
                  <p>
                    Be careful with websites using urgent messages or
                    unrealistic offers.
                  </p>
                </div>
              </div>

              <div className="website-check">
                <span>04</span>
                <div>
                  <h3>Verify Before Sharing</h3>
                  <p>
                    Confirm that the website is trustworthy before
                    entering sensitive information.
                  </p>
                </div>
              </div>

            </div>

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  "Website Safety Reminder: Check the website address and verify the source before entering sensitive information."
                )
              }
            >
              Website Safety Reminder
            </button>

          </div>

        </div>

      </section>
            {/* Social Media Scam Awareness */}
      <section className="social-section" id="social-media">

        <div className="social-content">

          <div className="social-text">

            <p className="section-label">SOCIAL MEDIA SAFETY</p>

            <h2>Stay Safe on Social Media</h2>

            <p>
              Social media scams can involve fake profiles, suspicious
              messages, misleading offers and attempts to collect personal
              information.
            </p>

            <div className="social-points">

              <div className="social-point">
                <span>👤</span>
                <div>
                  <h3>Check Unknown Profiles</h3>
                  <p>
                    Be careful when interacting with unfamiliar accounts.
                  </p>
                </div>
              </div>

              <div className="social-point">
                <span>🔗</span>
                <div>
                  <h3>Avoid Suspicious Links</h3>
                  <p>
                    Do not open unexpected links sent through social media.
                  </p>
                </div>
              </div>

              <div className="social-point">
                <span>🎁</span>
                <div>
                  <h3>Question Unrealistic Offers</h3>
                  <p>
                    Be cautious of prizes, jobs or offers that seem too
                    good to be true.
                  </p>
                </div>
              </div>

              <div className="social-point">
                <span>🔒</span>
                <div>
                  <h3>Protect Your Privacy</h3>
                  <p>
                    Review privacy settings and avoid sharing unnecessary
                    personal information.
                  </p>
                </div>
              </div>

            </div>

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  "Social Media Safety Reminder: Be careful with unknown profiles, suspicious links and unexpected offers."
                )
              }
            >
              Social Media Reminder
            </button>

          </div>

          <div className="social-card">

            <div className="social-icon">📲</div>

            <h3>Think Before You Trust</h3>

            <p>
              Verify profiles, links and offers before taking action
              online.
            </p>

          </div>

        </div>

      </section>
      {/* Online Shopping Scam Awareness */}
<section className="shopping-section" id="shopping">

  <div className="shopping-content">

    <div className="shopping-card">
      <div className="shopping-icon">🛒</div>
      <h3>Shop Smart Online</h3>
      <p>
        Check the seller, website and payment details before
        placing an online order.
      </p>
    </div>

    <div className="shopping-text">

      <p className="section-label">ONLINE SHOPPING SAFETY</p>

      <h2>Stay Safe While Shopping Online</h2>

      <p>
        Online shopping scams may involve fake websites, misleading
        offers, fake products or suspicious payment requests.
      </p>

      <div className="shopping-points">

        <div className="shopping-point">
          <span>🌐</span>
          <div>
            <h3>Check the Website</h3>
            <p>
              Verify the website address before entering your personal
              or payment information.
            </p>
          </div>
        </div>

        <div className="shopping-point">
          <span>💰</span>
          <div>
            <h3>Be Careful With Huge Discounts</h3>
            <p>
              Extremely cheap offers can be a warning sign of a
              suspicious seller or website.
            </p>
          </div>
        </div>

        <div className="shopping-point">
          <span>⭐</span>
          <div>
            <h3>Check Reviews Carefully</h3>
            <p>
              Look for reliable product and seller information before
              making a purchase.
            </p>
          </div>
        </div>

        <div className="shopping-point">
          <span>🔐</span>
          <div>
            <h3>Use Safe Payment Methods</h3>
            <p>
              Avoid sharing OTPs, passwords or other confidential
              information with anyone.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Online Shopping Safety Reminder: Check the website, seller, reviews and payment details before purchasing."
          )
        }
      >
        Shopping Safety Reminder
      </button>

    </div>

  </div>

</section>
{/* Email Scam Awareness */}
<section className="email-section" id="email">

  <div className="email-content">

    <div className="email-text">

      <p className="section-label">EMAIL SAFETY</p>

      <h2>Stay Safe From Email Scams</h2>

      <p>
        Email scams can use fake messages, suspicious links and
        misleading requests to trick users into sharing information
        or making unsafe decisions.
      </p>

      <div className="email-points">

        <div className="email-point">
          <span>📧</span>
          <div>
            <h3>Check the Sender</h3>
            <p>
              Carefully check the sender's email address before
              responding or clicking anything.
            </p>
          </div>
        </div>

        <div className="email-point">
          <span>🔗</span>
          <div>
            <h3>Avoid Suspicious Links</h3>
            <p>
              Do not open unexpected links from unknown or suspicious
              emails.
            </p>
          </div>
        </div>

        <div className="email-point">
          <span>⚠️</span>
          <div>
            <h3>Watch for Urgent Requests</h3>
            <p>
              Be careful when an email creates pressure to act
              immediately or asks for sensitive information.
            </p>
          </div>
        </div>

        <div className="email-point">
          <span>🔒</span>
          <div>
            <h3>Protect Your Information</h3>
            <p>
              Never share passwords, OTPs or other confidential
              information through suspicious emails.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Email Safety Reminder: Check the sender, avoid suspicious links and never share confidential information."
          )
        }
      >
        Email Safety Reminder
      </button>

    </div>

    <div className="email-card">
      <div className="email-icon">📩</div>
      <h3>Think Before You Click</h3>
      <p>
        Verify unexpected emails before opening links or sharing
        personal information.
      </p>
    </div>

  </div>

</section>
{/* Password Safety Guide */}
<section className="password-section" id="password">

  <div className="password-content">

    <div className="password-card">
      <div className="password-icon">🔐</div>
      <h3>Protect Your Passwords</h3>
      <p>
        Strong and unique passwords help protect your online accounts
        from unauthorized access.
      </p>
    </div>

    <div className="password-text">

      <p className="section-label">PASSWORD SAFETY</p>

      <h2>Keep Your Accounts Secure</h2>

      <p>
        Passwords are an important part of online security. Using
        strong and different passwords can reduce the risk of
        unauthorized access to your accounts.
      </p>

      <div className="password-points">

        <div className="password-point">
          <span>🔑</span>
          <div>
            <h3>Use Strong Passwords</h3>
            <p>
              Use passwords that are difficult for others to guess.
            </p>
          </div>
        </div>

        <div className="password-point">
          <span>🚫</span>
          <div>
            <h3>Do Not Reuse Passwords</h3>
            <p>
              Avoid using the same password for multiple important
              accounts.
            </p>
          </div>
        </div>

        <div className="password-point">
          <span>🤫</span>
          <div>
            <h3>Keep Passwords Private</h3>
            <p>
              Never share your passwords with other people or
              suspicious websites.
            </p>
          </div>
        </div>

        <div className="password-point">
          <span>🛡️</span>
          <div>
            <h3>Use Two-Factor Authentication</h3>
            <p>
              Enable two-factor authentication when it is available
              for your account.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Password Safety Reminder: Use strong, unique passwords and keep them private."
          )
        }
      >
        Password Safety Reminder
      </button>

    </div>

  </div>

</section>
{/* Strong Password Tips */}
<section className="strong-password-section" id="strong-password">

  <div className="strong-password-content">

    <div className="strong-password-text">

      <p className="section-label">STRONG PASSWORD TIPS</p>

      <h2>Create Better Passwords</h2>

      <p>
        A strong password should be difficult to guess and should not
        be reused across multiple important accounts.
      </p>

      <div className="strong-password-points">

        <div className="strong-password-point">
          <span>🔤</span>
          <div>
            <h3>Use Different Characters</h3>
            <p>
              Combine different types of characters to make passwords
              harder to guess.
            </p>
          </div>
        </div>

        <div className="strong-password-point">
          <span>📏</span>
          <div>
            <h3>Prefer Longer Passwords</h3>
            <p>
              Longer passwords or passphrases can provide better
              protection for your accounts.
            </p>
          </div>
        </div>

        <div className="strong-password-point">
          <span>🙅</span>
          <div>
            <h3>Avoid Easy Information</h3>
            <p>
              Avoid using easily known information such as your name
              or simple predictable words.
            </p>
          </div>
        </div>

        <div className="strong-password-point">
          <span>🔄</span>
          <div>
            <h3>Use Unique Passwords</h3>
            <p>
              Use a different password for each important account.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Strong Password Reminder: Use long, unique and difficult-to-guess passwords."
          )
        }
      >
        Password Tips Reminder
      </button>

    </div>

    <div className="strong-password-card">
      <div className="strong-password-icon">🔑</div>
      <h3>Think Strong</h3>
      <p>
        Create passwords that are difficult for others to guess and
        keep them private.
      </p>
    </div>

  </div>

</section>
{/* Social Media Safety Tips */}
<section className="social-tips-section" id="social-tips">

  <div className="social-tips-content">

    <div className="social-tips-card">
      <div className="social-tips-icon">📱</div>
      <h3>Protect Your Social Accounts</h3>
      <p>
        Follow simple safety practices to keep your social media
        accounts and personal information more secure.
      </p>
    </div>

    <div className="social-tips-text">

      <p className="section-label">SOCIAL MEDIA SAFETY TIPS</p>

      <h2>Use Social Media Safely</h2>

      <p>
        Social media accounts can contain personal information,
        photos and messages. Follow basic security practices while
        using social platforms.
      </p>

      <div className="social-tips-points">

        <div className="social-tips-point">
          <span>🔒</span>
          <div>
            <h3>Review Privacy Settings</h3>
            <p>
              Check your privacy settings and control who can see
              your personal information.
            </p>
          </div>
        </div>

        <div className="social-tips-point">
          <span>🛡️</span>
          <div>
            <h3>Enable Two-Factor Authentication</h3>
            <p>
              Use two-factor authentication when the platform
              provides the option.
            </p>
          </div>
        </div>

        <div className="social-tips-point">
          <span>👀</span>
          <div>
            <h3>Think Before Sharing</h3>
            <p>
              Avoid sharing unnecessary personal or sensitive
              information publicly.
            </p>
          </div>
        </div>

        <div className="social-tips-point">
          <span>🚫</span>
          <div>
            <h3>Be Careful With Unknown Requests</h3>
            <p>
              Avoid accepting suspicious friend requests or
              interacting with unfamiliar accounts.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Social Media Safety Reminder: Review privacy settings, protect your account and think before sharing."
          )
        }
      >
        Social Media Reminder
      </button>

    </div>

  </div>

</section>
{/* Public Wi-Fi Safety Tips */}
<section className="wifi-section" id="wifi">

  <div className="wifi-content">

    <div className="wifi-text">

      <p className="section-label">PUBLIC WI-FI SAFETY</p>

      <h2>Stay Safe on Public Wi-Fi</h2>

      <p>
        Public Wi-Fi can be convenient, but users should be careful
        when connecting to unknown or unsecured networks.
      </p>

      <div className="wifi-points">

        <div className="wifi-point">
          <span>📶</span>
          <div>
            <h3>Verify the Network</h3>
            <p>
              Check the official network name before connecting to
              public Wi-Fi.
            </p>
          </div>
        </div>

        <div className="wifi-point">
          <span>🔒</span>
          <div>
            <h3>Avoid Sensitive Activities</h3>
            <p>
              Avoid accessing highly sensitive accounts when using
              an unfamiliar public network.
            </p>
          </div>
        </div>

        <div className="wifi-point">
          <span>📱</span>
          <div>
            <h3>Turn Off Auto-Connect</h3>
            <p>
              Disable automatic connection to unknown Wi-Fi networks
              on your device.
            </p>
          </div>
        </div>

        <div className="wifi-point">
          <span>🚫</span>
          <div>
            <h3>Forget Unknown Networks</h3>
            <p>
              Remove saved networks that you no longer use or do not
              recognize.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Public Wi-Fi Reminder: Verify the network and avoid sensitive activities on unfamiliar Wi-Fi."
          )
        }
      >
        Wi-Fi Safety Reminder
      </button>

    </div>

    <div className="wifi-card">
      <div className="wifi-icon">📶</div>
      <h3>Connect Carefully</h3>
      <p>
        Always verify public Wi-Fi networks before connecting your
        device.
      </p>
    </div>

  </div>

</section>
{/* Mobile Security Tips */}
<section className="mobile-section" id="mobile-security">

  <div className="mobile-content">

    <div className="mobile-card">
      <div className="mobile-icon">📱</div>
      <h3>Secure Your Mobile</h3>
      <p>
        Keep your phone protected because it may contain personal
        information, accounts and important data.
      </p>
    </div>

    <div className="mobile-text">

      <p className="section-label">MOBILE SECURITY</p>

      <h2>Keep Your Mobile Device Safe</h2>

      <p>
        Smartphones are commonly used for banking, communication and
        social media. Basic security practices can help protect your
        device and personal information.
      </p>

      <div className="mobile-points">

        <div className="mobile-point">
          <span>🔒</span>
          <div>
            <h3>Use a Screen Lock</h3>
            <p>
              Use a secure PIN, password or supported device lock to
              protect your phone.
            </p>
          </div>
        </div>

        <div className="mobile-point">
          <span>⬆️</span>
          <div>
            <h3>Keep Software Updated</h3>
            <p>
              Install security and software updates when they are
              available.
            </p>
          </div>
        </div>

        <div className="mobile-point">
          <span>📲</span>
          <div>
            <h3>Install Trusted Apps</h3>
            <p>
              Download apps from trusted sources and check app
              permissions carefully.
            </p>
          </div>
        </div>

        <div className="mobile-point">
          <span>🛡️</span>
          <div>
            <h3>Protect Your Accounts</h3>
            <p>
              Use strong passwords and two-factor authentication for
              important accounts.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Mobile Security Reminder: Keep your device locked, updated and protected with trusted apps and account security."
          )
        }
      >
        Mobile Safety Reminder
      </button>

    </div>

  </div>

</section>
{/* Computer Security Tips */}
<section className="computer-section" id="computer-security">

  <div className="computer-content">

    <div className="computer-text">

      <p className="section-label">COMPUTER SECURITY</p>

      <h2>Keep Your Computer Safe</h2>

      <p>
        Computers can store important files, personal information and
        account details. Basic security practices can help protect
        your system and data.
      </p>

      <div className="computer-points">

        <div className="computer-point">
          <span>⬆️</span>
          <div>
            <h3>Keep Software Updated</h3>
            <p>
              Install operating system and software updates to keep
              your computer protected.
            </p>
          </div>
        </div>

        <div className="computer-point">
          <span>🛡️</span>
          <div>
            <h3>Use Security Software</h3>
            <p>
              Use trusted security software and keep its protection
              features updated.
            </p>
          </div>
        </div>

        <div className="computer-point">
          <span>📁</span>
          <div>
            <h3>Protect Important Files</h3>
            <p>
              Keep important files backed up and avoid opening
              suspicious files or attachments.
            </p>
          </div>
        </div>

        <div className="computer-point">
          <span>🔒</span>
          <div>
            <h3>Lock Your Computer</h3>
            <p>
              Lock your computer when you are away to prevent
              unauthorized access.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Computer Security Reminder: Keep software updated, protect important files and lock your computer when away."
          )
        }
      >
        Computer Safety Reminder
      </button>

    </div>

    <div className="computer-card">
      <div className="computer-icon">💻</div>
      <h3>Protect Your Data</h3>
      <p>
        Keep your computer updated, secure and protected from
        suspicious files and unauthorized access.
      </p>
    </div>

  </div>

</section>
{/* Common Scam Warning Signs */}
<section className="warning-signs-section" id="warning-signs">

  <div className="warning-signs-content">

    <div className="warning-signs-text">

      <p className="section-label">SCAM WARNING SIGNS</p>

      <h2>Recognize Common Scam Signs</h2>

      <p>
        Scammers often use pressure, fake offers and suspicious
        requests to make users act without checking the information.
      </p>

      <div className="warning-signs-points">

        <div className="warning-sign-point">
          <span>🚨</span>
          <div>
            <h3>Urgent or Threatening Messages</h3>
            <p>
              Be careful when a message pressures you to act
              immediately or creates unnecessary fear.
            </p>
          </div>
        </div>

        <div className="warning-sign-point">
          <span>🎁</span>
          <div>
            <h3>Unexpected Prizes or Offers</h3>
            <p>
              Be cautious of unexpected rewards, jobs or offers that
              seem unrealistic.
            </p>
          </div>
        </div>

        <div className="warning-sign-point">
          <span>🔗</span>
          <div>
            <h3>Suspicious Links</h3>
            <p>
              Check links carefully before opening them, especially
              when they come from unknown sources.
            </p>
          </div>
        </div>

        <div className="warning-sign-point">
          <span>🔐</span>
          <div>
            <h3>Requests for Sensitive Information</h3>
            <p>
              Never share passwords, OTPs or other confidential
              information because someone asks for it unexpectedly.
            </p>
          </div>
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() =>
          alert(
            "Scam Warning Reminder: Stop, verify the information and think carefully before taking action."
          )
        }
      >
        Scam Warning Reminder
      </button>

    </div>

    <div className="warning-signs-card">
      <div className="warning-signs-icon">⚠️</div>
      <h3>Stop. Check. Verify.</h3>
      <p>
        If something feels suspicious, pause and verify the
        information before taking action.
      </p>
    </div>

  </div>

</section>
{/* Frequently Asked Questions */}
<section className="faq-section" id="faq">

  <div className="faq-content">

    <div className="faq-heading">

      <p className="section-label">FREQUENTLY ASKED QUESTIONS</p>

      <h2>Cyber Safety FAQs</h2>

      <p>
        Find simple answers to some common questions about online
        safety, scams and protecting your personal information.
      </p>

    </div>

    <div className="faq-list">

      <details className="faq-item">
        <summary>What is phishing?</summary>
        <p>
          Phishing is a scam where fake messages, emails or websites
          are used to trick people into sharing sensitive information.
        </p>
      </details>

      <details className="faq-item">
        <summary>Should I share my OTP with anyone?</summary>
        <p>
          No. Never share your OTP with another person, even if they
          claim to be from a bank, company or support service.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I identify a suspicious website?</summary>
        <p>
          Check the website address carefully and be cautious of
          unknown links, unusual offers or requests for sensitive
          information.
        </p>
      </details>

      <details className="faq-item">
        <summary>What should I do before making an online payment?</summary>
        <p>
          Verify the receiver, payment request and transaction details
          before completing the payment.
        </p>
      </details>

      <details className="faq-item">
        <summary>How can I protect my social media account?</summary>
        <p>
          Use a strong unique password, enable two-factor
          authentication and review your privacy settings.
        </p>
      </details>

    </div>

  </div>

</section>
{/* Cyber Helpdesk / Ask a Query */}
<section className="query-section" id="query">

  <div className="query-content">

    <div className="query-text">

      <p className="section-label">CYBER HELPDESK</p>

      <h2>Ask Your Cyber Safety Query</h2>

      <p>
        Have a question about an online scam, suspicious message,
        account security or any other cyber safety topic? Submit
        your query through the helpdesk.
      </p>

      <div className="query-info">

        <div className="query-info-item">
          <span>💬</span>
          <div>
            <h3>Ask a Question</h3>
            <p>Describe your cyber safety concern clearly.</p>
          </div>
        </div>

        <div className="query-info-item">
          <span>🛡️</span>
          <div>
            <h3>Get Safety Guidance</h3>
            <p>Use Cyber Assist to understand common online risks.</p>
          </div>
        </div>

        <div className="query-info-item">
          <span>📚</span>
          <div>
            <h3>Learn More</h3>
            <p>Explore the safety information available on the website.</p>
          </div>
        </div>

      </div>

    </div>

    <div className="query-form-card">

      <h3>Submit Your Query</h3>

      <form onSubmit={submitQuery}>

  <label>Name</label>

  <input
    type="text"
    placeholder="Enter your name"
    value={queryName}
    onChange={(e) => setQueryName(e.target.value)}
    required
  />

  <label>Email</label>

  <input
    type="email"
    placeholder="Enter your email"
    value={queryEmail}
    onChange={(e) => setQueryEmail(e.target.value)}
    required
  />

  <label>Your Query</label>

  <textarea
    placeholder="Describe your cyber safety question..."
    rows="5"
    value={queryText}
    onChange={(e) => setQueryText(e.target.value)}
    required
  ></textarea>

  <button type="submit" className="primary-btn">
    Submit Query
  </button>

</form>
<button
  type="button"
  className="secondary-btn"
  onClick={fetchQueries}
>
  View Submitted Queries
</button>

{showQueries && (
  <div className="submitted-queries">
    <h3>Submitted Queries</h3>

    {savedQueries.length === 0 ? (
      <p>No queries submitted yet.</p>
    ) : (
      savedQueries.map((item) => (
        <div className="submitted-query" key={item._id}>
          <h4>{item.name}</h4>

          <p>
            <strong>Email:</strong> {item.email}
          </p>

          <p>
            <strong>Query:</strong> {item.query}
          </p>
        </div>
      ))
    )}
  </div>
)}
<button
  type="button"
  className="secondary-btn"
  onClick={fetchQueries}
>
  View Submitted Queries
</button>

{showQueries && (
  <div className="submitted-queries">
    <h3>Submitted Queries</h3>

    {savedQueries.length === 0 ? (
      <p>No queries submitted yet.</p>
    ) : (
      savedQueries.map((item) => (
        <div className="submitted-query" key={item._id}>
          <h4>{item.name}</h4>

          <p>
            <strong>Email:</strong> {item.email}
          </p>

          <p>
            <strong>Query:</strong> {item.query}
          </p>
        </div>
      ))
    )}
  </div>
)}

    </div>

  </div>

</section>

      {/* Safety Tips */}
      <section className="tips-section" id="tips">
        <div className="tips-content">
          <p className="section-label">SAFETY FIRST</p>

          <h2>Simple Safety Tips</h2>

          <ul>
            <li>🔐 Use strong and unique passwords.</li>
            <li>🚫 Never share OTPs or PINs with anyone.</li>
            <li>🔎 Check links before opening them.</li>
            <li>📱 Keep your devices and applications updated.</li>
            <li>⚠️ Be careful with unknown messages and calls.</li>
          </ul>
        </div>
      </section>

      {/* Helpdesk */}
      <section className="helpdesk" id="helpdesk">
        <p className="section-label">COMMUNITY HELPDESK</p>

        <h2>Have a Cyber Safety Query?</h2>

        <p>
          Find simple guidance for common cyber safety questions and
          problems.
        </p>

        <button className="primary-btn">
          Explore Helpdesk
        </button>
      </section>

      {/* About */}
      <section className="about" id="about">
        {/* Feature 20 - Cyber Safety Awareness Resources */}
<section className="section resources-section">
  <h2>Cyber Safety Awareness Resources</h2>

  <p className="section-intro">
    Explore useful resources to learn about cyber safety and protect yourself
    from common online threats.
  </p>

  <div className="resource-grid">

    <div className="resource-card">
      <h3>🛡️ Cyber Safety Basics</h3>
      <p>
        Learn basic safety practices for protecting your personal information
        while using the internet.
      </p>
      <a href="#tips">Learn Safety Tips</a>
    </div>

    <div className="resource-card">
      <h3>🎣 Phishing Awareness</h3>
      <p>
        Understand how fake emails, messages and websites can be used to steal
        sensitive information.
      </p>
      <a href="#phishing">Learn About Phishing</a>
    </div>

    <div className="resource-card">
      <h3>💳 Online Fraud Awareness</h3>
      <p>
        Learn how to identify suspicious payment requests, fake offers and
        common online fraud attempts.
      </p>
      <a href="#upi">Learn About UPI Safety</a>
    </div>

    <div className="resource-card">
      <h3>🔐 Password Security</h3>
      <p>
        Learn how to create strong passwords and keep your online accounts
        secure.
      </p>
      <a href="#password">Password Safety</a>
    </div>

    <div className="resource-card">
      <h3>📱 Mobile Security</h3>
      <p>
        Follow simple security practices to keep your smartphone and personal
        data protected.
      </p>
      <a href="#mobile">Mobile Safety</a>
    </div>

    <div className="resource-card">
      <h3>🌐 Safe Internet Usage</h3>
      <p>
        Get practical guidance for browsing websites, using public Wi-Fi and
        staying safe online.
      </p>
      <a href="#wifi">Internet Safety</a>
    </div>

  </div>
</section>
{/* Feature 21 - Cyber Safety Awareness Articles */}
<section className="section articles-section">
  <h2>Cyber Safety Awareness Articles</h2>

  <p className="section-intro">
    Read simple articles to understand common cyber threats and stay safer
    while using the internet.
  </p>

  <div className="article-grid">

    <div className="article-card">
      <h3>How to Identify Phishing Messages</h3>
      <p>
        Phishing messages often try to create urgency and may contain
        suspicious links or requests for personal information.
      </p>
      <a href="#phishing">Read More</a>
    </div>

    <div className="article-card">
      <h3>How to Stay Safe from OTP Scams</h3>
      <p>
        Never share your OTP with another person. Always verify why an OTP
        is being requested before using it.
      </p>
      <a href="#otp">Read More</a>
    </div>

    <div className="article-card">
      <h3>Safe UPI Payment Practices</h3>
      <p>
        Check the receiver's details carefully and be cautious of unexpected
        payment requests or suspicious instructions.
      </p>
      <a href="#upi">Read More</a>
    </div>

    <div className="article-card">
      <h3>How to Check a Website Before Using It</h3>
      <p>
        Carefully check the website address and avoid entering sensitive
        information on unfamiliar or suspicious websites.
      </p>
      <a href="#fake-website">Read More</a>
    </div>

    <div className="article-card">
      <h3>Protecting Your Social Media Account</h3>
      <p>
        Use strong passwords, privacy settings and additional security
        features to protect your social media accounts.
      </p>
      <a href="#social-media">Read More</a>
    </div>

    <div className="article-card">
      <h3>Safe Online Shopping</h3>
      <p>
        Check sellers, website addresses and payment details before making
        an online purchase.
      </p>
      <a href="#shopping">Read More</a>
    </div>

  </div>
</section>
{/* Feature 22 - Emergency Cyber-Safety Guidance */}
<section className="section emergency-section">
  <h2>Emergency Cyber-Safety Guidance</h2>

  <p className="section-intro">
    If you think you have encountered an online scam or cyber-security
    problem, follow these basic safety steps immediately.
  </p>

  <div className="emergency-grid">

    <div className="emergency-card">
      <h3>🚨 Suspicious Payment</h3>
      <p>
        Stop further transactions and contact your bank or payment service
        through its official support channel.
      </p>
    </div>

    <div className="emergency-card">
      <h3>🔐 Account Compromised</h3>
      <p>
        Change your password immediately and enable additional account
        security features where available.
      </p>
    </div>

    <div className="emergency-card">
      <h3>🎣 Phishing Link</h3>
      <p>
        Do not enter any more information. Close the suspicious page and
        avoid opening the link again.
      </p>
    </div>

    <div className="emergency-card">
      <h3>📱 Suspicious Message</h3>
      <p>
        Do not reply, share personal information or follow instructions from
        an unknown sender.
      </p>
    </div>

  </div>

  <div className="emergency-note">
    <strong>Important:</strong> Use only official bank, platform or
    cyber-crime reporting channels when seeking help.
  </div>
</section>
{/* Feature 23 - Safety Checklist */}
<section className="section checklist-section">
  <h2>Cyber Safety Checklist</h2>

  <p className="section-intro">
    Use this checklist to review some basic practices for staying safe online.
  </p>

  <div className="checklist-card">
    <label>
      <input type="checkbox" />
      I use strong and unique passwords for my accounts.
    </label>

    <label>
      <input type="checkbox" />
      I never share OTPs or passwords with anyone.
    </label>

    <label>
      <input type="checkbox" />
      I check website addresses before entering personal information.
    </label>

    <label>
      <input type="checkbox" />
      I verify payment requests before making online payments.
    </label>

    <label>
      <input type="checkbox" />
      I keep my mobile phone and computer updated.
    </label>

    <label>
      <input type="checkbox" />
      I avoid suspicious links and unknown attachments.
    </label>

    <label>
      <input type="checkbox" />
      I use privacy and security settings on social media.
    </label>

    <label>
      <input type="checkbox" />
      I avoid entering sensitive information on public computers.
    </label>
  </div>
</section>
{/* Feature 24 - Important Safety Tips */}
<section className="section quick-tips-section">
  <h2>Important Cyber Safety Tips</h2>

  <p className="section-intro">
    Keep these quick tips in mind whenever you use the internet or digital
    payment services.
  </p>

  <div className="quick-tips-grid">
    <div className="quick-tip-card">
      <h3>🔐 Protect Your Password</h3>
      <p>Use strong passwords and never share them with anyone.</p>
    </div>

    <div className="quick-tip-card">
      <h3>🔢 Keep OTP Private</h3>
      <p>Never share an OTP, PIN or other confidential security information.</p>
    </div>

    <div className="quick-tip-card">
      <h3>🔗 Check Links</h3>
      <p>Think before clicking unknown links received through messages or email.</p>
    </div>

    <div className="quick-tip-card">
      <h3>💳 Verify Payments</h3>
      <p>Always check the receiver and payment details before confirming a transaction.</p>
    </div>

    <div className="quick-tip-card">
      <h3>📱 Update Devices</h3>
      <p>Keep your phone, computer and important applications updated.</p>
    </div>

    <div className="quick-tip-card">
      <h3>🌐 Use Trusted Websites</h3>
      <p>Check the website address before entering personal or financial information.</p>
    </div>
  </div>
</section>
{/* Feature 25 - Safety Alerts / Notifications */}
<section className="section alerts-section">
  <h2>Safety Alerts & Notifications</h2>

  <p className="section-intro">
    Stay aware of common online scams and important cyber-safety warnings.
  </p>

  <div className="alerts-container">

    <div className="alert-card">
      <span className="alert-icon">⚠️</span>
      <div>
        <h3>Beware of Unknown Links</h3>
        <p>
          Do not open suspicious links received through unknown messages,
          emails or social media.
        </p>
      </div>
    </div>

    <div className="alert-card">
      <span className="alert-icon">🔐</span>
      <div>
        <h3>Never Share OTP</h3>
        <p>
          Banks and legitimate services generally do not ask you to share
          your OTP with another person.
        </p>
      </div>
    </div>

    <div className="alert-card">
      <span className="alert-icon">💳</span>
      <div>
        <h3>Verify Payment Requests</h3>
        <p>
          Always verify the receiver and payment details before approving
          an online payment.
        </p>
      </div>
    </div>

    <div className="alert-card">
      <span className="alert-icon">🎣</span>
      <div>
        <h3>Watch for Phishing Attempts</h3>
        <p>
          Be careful with urgent messages asking for passwords, financial
          information or personal details.
        </p>
      </div>
    </div>

  </div>
</section>
{/* Feature 26 - Important Cyber Help Contacts */}
<section className="section contacts-section">
  <h2>Important Cyber Help Contacts</h2>

  <p className="section-intro">
    Use trusted and official channels when you need help with a cyber
    safety issue or online fraud.
  </p>

  <div className="contacts-grid">

    <div className="contact-card">
      <h3>🚨 Cyber Crime Helpline</h3>
      <p>
        For reporting cyber-related financial fraud and other cyber crime
        incidents in India.
      </p>
      <strong>Helpline: 1930</strong>
    </div>

    <div className="contact-card">
      <h3>🌐 Cyber Crime Reporting Portal</h3>
      <p>
        Use the official Government of India cyber crime reporting portal
        for submitting a cyber crime complaint.
      </p>
      <a
        href="https://cybercrime.gov.in"
        target="_blank"
        rel="noreferrer"
      >
        Visit Official Portal
      </a>
    </div>

    <div className="contact-card">
      <h3>🏦 Bank / Payment Service</h3>
      <p>
        If you notice an unauthorized transaction, contact your bank or
        payment service immediately through its official support channel.
      </p>
      <strong>Use the official contact details of your bank.</strong>
    </div>

    <div className="contact-card">
      <h3>📞 Emergency Support</h3>
      <p>
        For immediate physical danger or emergencies, contact the appropriate
        local emergency service.
      </p>
      <strong>Emergency: 112</strong>
    </div>

  </div>
</section>
{/* Feature 27 - User Feedback Form */}
<section className="section feedback-section">
  <h2>User Feedback</h2>

  <p className="section-intro">
    Share your feedback to help us improve Cyber Assist.
  </p>

  <div className="feedback-card">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you for your feedback!");
        e.target.reset();
      }}
    >
      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>How was your experience?</label>
        <select required>
          <option value="">Select an option</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="needs-improvement">Needs Improvement</option>
        </select>
      </div>

      <div className="form-group">
        <label>Your Feedback</label>
        <textarea
          placeholder="Write your feedback here..."
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" className="primary-btn">
        Submit Feedback
      </button>
    </form>
  </div>
</section>
{/* Feature 28 - User Login / Register */}
<section className="section auth-section">
  <h2>User Login / Register</h2>

  <p className="section-intro">
    Create an account or login to access personalized Cyber Assist services.
  </p>

  <div className="auth-card">

    <div className="auth-tabs">
      <button type="button" className="auth-tab active">
        Login
      </button>

      <button type="button" className="auth-tab">
        Register
      </button>
    </div>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Login feature is currently available as a frontend demo.");
      }}
    >
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" className="primary-btn">
        Login
      </button>
    </form>

    <p className="auth-note">
      New users can register when the full account system is connected.
    </p>

  </div>
</section>
{/* Feature 30 - Admin Management Panel */}
<section className="section admin-section">
  <h2>Admin Management Panel</h2>

  <p className="section-intro">
    Admin can review cyber safety queries submitted by users.
  </p>

  <div className="admin-card">
    <div className="admin-header">
      <div>
        <h3>Query Management</h3>
        <p>Review submitted helpdesk queries.</p>
      </div>

      <button
        type="button"
        className="primary-btn"
        onClick={fetchQueries}
      >
        Refresh Queries
      </button>
    </div>

    <div className="admin-stats">
      <div className="admin-stat">
        <h4>{savedQueries.length}</h4>
        <p>Total Queries</p>
      </div>

      <div className="admin-stat">
        <h4>Active</h4>
        <p>System Status</p>
      </div>
    </div>

    {showQueries && (
      <div className="admin-query-list">
        {savedQueries.length === 0 ? (
          <p>No queries available.</p>
        ) : (
          savedQueries.map((item) => (
            <div className="admin-query-item" key={item._id}>
              <h4>{item.name}</h4>

              <p>
                <strong>Email:</strong> {item.email}
              </p>

              <p>
                <strong>Query:</strong> {item.query}
              </p>

              <small>
                Submitted: {new Date(item.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    )}
  </div>
</section>
        <h2>About Cyber Assist</h2>

        <p>
          Cyber Assist is a web-based community helpdesk designed to provide
          simple and easy-to-understand cyber safety information and
          awareness resources.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Cyber Assist | Community Cyber Safety</p>
      </footer>

    </div>
  );
}

export default App;