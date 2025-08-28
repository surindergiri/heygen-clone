import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "5 avatar videos per month",
        "10 image-to-ads conversions",
        "2 video translations",
        "720p video quality",
        "Basic templates",
        "Email support",
        "Watermark included"
      ],
      limitations: [
        "Limited to 720p quality",
        "Watermark on videos",
        "Basic templates only"
      ],
      popular: false,
      cta: "Start Free",
      variant: "outline"
    },
    {
      name: "Professional",
      description: "Ideal for content creators and small businesses",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "50 avatar videos per month",
        "100 image-to-ads conversions",
        "20 video translations",
        "1080p HD video quality",
        "Premium templates",
        "Priority support",
        "No watermark",
        "Custom branding",
        "Analytics dashboard"
      ],
      limitations: [],
      popular: true,
      cta: "Start Professional",
      variant: "default"
    },
    {
      name: "Enterprise",
      description: "For agencies and large organizations",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Unlimited avatar videos",
        "Unlimited image-to-ads",
        "Unlimited video translations",
        "4K video quality",
        "Custom templates",
        "24/7 dedicated support",
        "White-label solution",
        "API access",
        "Team collaboration",
        "Advanced analytics",
        "Custom integrations"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
      variant: "secondary"
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
    },
    {
      question: "What happens if I exceed my monthly limits?",
      answer: "You'll receive notifications when approaching your limits. You can either upgrade your plan or purchase additional credits for the current month."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial."
    }
  ];

  const getPrice = (plan) => {
    return isAnnual ? plan?.annualPrice : plan?.monthlyPrice;
  };

  const getSavings = (plan) => {
    if (plan?.monthlyPrice === 0) return 0;
    return Math.round(((plan?.monthlyPrice * 12 - plan?.annualPrice) / (plan?.monthlyPrice * 12)) * 100);
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            <Icon name="CreditCard" size={16} className="mr-2" />
            Simple Pricing
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose the Perfect Plan for
            <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent"> Your Needs</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core AI features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 bg-card rounded-xl p-2 w-fit mx-auto">
            <span className={`text-sm font-medium transition-colors duration-200 ${
              !isAnnual ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                isAnnual ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm font-medium transition-colors duration-200 ${
              isAnnual ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
                Save up to 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans?.map((plan, index) => (
            <div
              key={plan?.name}
              className={`relative bg-card rounded-2xl shadow-card hover:shadow-floating transition-all duration-300 ${
                plan?.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan?.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {plan?.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        ${getPrice(plan)}
                      </span>
                      {plan?.monthlyPrice > 0 && (
                        <span className="text-muted-foreground">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    
                    {isAnnual && plan?.monthlyPrice > 0 && (
                      <div className="text-sm text-success font-medium">
                        Save {getSavings(plan)}% annually
                      </div>
                    )}
                  </div>

                  <Link to="/register">
                    <Button
                      variant={plan?.variant}
                      size="lg"
                      fullWidth
                      iconName={plan?.name === "Enterprise" ? "Mail" : "ArrowRight"}
                      iconPosition="right"
                    >
                      {plan?.cta}
                    </Button>
                  </Link>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">What's included:</h4>
                  <ul className="space-y-3">
                    {plan?.features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan?.limitations?.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h5 className="font-medium text-muted-foreground text-sm mb-2">Limitations:</h5>
                      <ul className="space-y-2">
                        {plan?.limitations?.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-3">
                            <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="Minus" size={10} className="text-muted-foreground" />
                            </div>
                            <span className="text-xs text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CreditCard" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="X" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">Cancel anytime</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            All plans include SSL encryption, regular backups, and 99.9% uptime guarantee
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs?.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">
                  {faq?.question}
                </h4>
                <p className="text-muted-foreground">
                  {faq?.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <Button variant="outline" iconName="MessageCircle" iconPosition="left">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;