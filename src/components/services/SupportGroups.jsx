import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  MessageCircle,
  Hash,
  Send,
  Facebook,
  Phone,
  Slack,
} from "lucide-react";
import NewNavBar from "../auth/NewNavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsynGroups,
  fetchAsynServices,
  getAllGroups,
  getAllPaginatedGroups,
  getAllPaginatedServices,
  getAllServices,
  getIsLoadingGroups,
  getIsLoadingServices,
  getUser,
} from "../../redux/transactions/TransactionSlice";

const SupportGroupsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;

  // Get groups
  const groupsList = useSelector(getAllGroups);
  const paginatedGroupsList = useSelector(getAllPaginatedGroups);
  const isLoadingGroups = useSelector(getIsLoadingGroups);

  // console.log("Groups List:", groupsList);
  // console.log("Paginated Groups List:", paginatedGroupsList);
  // console.log("Is Loading Groups:", isLoadingGroups);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchAsynGroups({
          currentPage: 1,
          searchQuery: "",
          categoryId: "",
          serviceId: "6866e47d35c41e4f6461788c",
        })
      );
    }
  }, [token, dispatch]);

  const [isVisible, setIsVisible] = useState({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Finding this community changed my life. I finally felt understood and supported through the hardest moments of motherhood.",
      platform: "WhatsApp Group",
    },
    {
      name: "Maria K.",
      text: "The 24/7 support here is incredible. Whether it's 2 AM or 2 PM, there's always someone who understands.",
      platform: "Discord Community",
    },
    {
      name: "Jennifer L.",
      text: "I've gained not just support, but lifelong friendships. We've helped each other through so much.",
      platform: "Telegram Channel",
    },
  ];

  const supportGroups = [
    {
      name: "WhatsApp Support Group",
      description:
        "Join our intimate WhatsApp group for daily check-ins, instant support, and real-time conversations with fellow mothers.",
      icon: Phone,
      members: "25 active members",
      color: "from-green-400 to-emerald-500",
      hoverColor: "hover:from-green-500 hover:to-emerald-600",
      link: "https://chat.whatsapp.com/your-group-link",
      subtitle: "Real-time chat & support",
    },
    {
      name: "Discord Community",
      description:
        "Join our Discord server with organized channels for different topics, voice chats, and regular virtual meetups.",
      icon: Hash,
      members: "150+ members",
      color: "from-indigo-400 to-purple-500",
      hoverColor: "hover:from-indigo-500 hover:to-purple-600",
      link: "https://discord.gg/your-server-invite",
      subtitle: "Organized channels & events",
    },
    {
      name: "Telegram Channel",
      description:
        "Receive daily motivational messages, parenting tips, and participate in supportive group discussions.",
      icon: Send,
      members: "200+ subscribers",
      color: "from-blue-400 to-cyan-500",
      hoverColor: "hover:from-blue-500 hover:to-cyan-600",
      link: "https://t.me/your-telegram-group",
      subtitle: "Daily inspiration & tips",
    },
    {
      name: "Facebook Group",
      description:
        "Join our Facebook group for longer-form discussions, event announcements, and photo sharing.",
      icon: Facebook,
      members: "500+ members",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      link: "https://facebook.com/groups/your-group",
      subtitle: "Public discussions & events",
    },
    {
      name: "Reddit Community",
      description:
        "Join our Reddit community for anonymous discussions, advice threads, and upvoted wisdom from experienced mothers.",
      icon: MessageCircle,
      members: "1k+ members",
      color: "from-orange-400 to-red-500",
      hoverColor: "hover:from-orange-500 hover:to-red-600",
      link: "https://reddit.com/r/your-subreddit",
      subtitle: "Anonymous support & advice",
    },
    {
      name: "Slack Workspace",
      description:
        "Join our Slack workspace for professional mother networking, career advice, and organized topic channels.",
      icon: Slack,
      members: "300+ members",
      color: "from-purple-400 to-pink-500",
      hoverColor: "hover:from-purple-500 hover:to-pink-600",
      link: "https://join.slack.com/your-workspace",
      subtitle: "Professional networking",
    },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}

      <NewNavBar />
      {/* Hero Section */}
      <section
        id="home"
        className="relative  flex items-center justify-center px-6 pt-2"
      >
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.home
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
              <Heart className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              You're{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Never
              </span>{" "}
              Alone
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Mother, join a support group where understanding, encouragement,
              and strength come from mothers just like you
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button 
                onClick={() => scrollToSection('groups')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Join a Support Group
              </button> */}
              <button
                onClick={() => scrollToSection("testimonials")}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Read Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Groups Matter */}
      <section id="why" className="py-2 relative">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.why
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Support Groups Matter
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Motherhood is beautiful, but it can also be overwhelming. You
              deserve a space where you can be heard, understood, and supported.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Understanding & Empathy",
                description:
                  "Connect with mothers who truly understand your experiences, challenges, and joys.",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: Shield,
                title: "Safe Space",
                description:
                  "Share your thoughts and feelings in a judgment-free environment where you can be yourself.",
                color: "from-blue-400 to-purple-400",
              },
              {
                icon: Sparkles,
                title: "Strength & Growth",
                description:
                  "Discover your inner strength and grow alongside other inspiring mothers on similar journeys.",
                color: "from-green-400 to-blue-400",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:bg-white/20 ${
                  isVisible.why
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Groups */}
      <section id="groups" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.groups
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Support Community
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find the platform that feels right for you. Each group offers a
              unique way to connect and support each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportGroups.map((group, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-white/95 border border-white/30 rounded-2xl p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                  isVisible.groups
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${group.color} rounded-full flex items-center justify-center mr-4`}
                  >
                    <group.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500">{group.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {group.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    👥 {group.members}
                  </span>
                  <a
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${group.color} ${group.hoverColor} text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105`}
                  >
                    Join Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.testimonials
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stories from Our Community
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Hear from mothers who found strength, support, and lasting
              friendships in our communities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-white/95 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-4 italic leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-gray-800">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[activeTestimonial].platform}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-pink-500 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div
            className={`text-center max-w-3xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 transform transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Take the first step towards finding your support system. You don't
              have to navigate motherhood alone.
            </p>
            <button
              onClick={() => scrollToSection("groups")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Choose Your Platform
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 backdrop-blur-md bg-white/10 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">MomSupport</div>
          <p className="text-white/60 mb-4">
            Building bridges between mothers, one conversation at a time.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupportGroupsPage;
