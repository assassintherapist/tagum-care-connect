import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Phone, AlertCircle, BookOpen, Users } from "lucide-react";

export const HIVInformation = () => {
  const emergencyContacts = [
    { name: "National AIDS Hotline", number: "02-8651-7800" },
    { name: "Tagum City Health Office", number: "(084) 216-3042" },
    { name: "Red Cross Tagum", number: "(084) 216-2345" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">HIV Information & Support</h2>
        <p className="text-muted-foreground">Educational resources and support information</p>
      </div>

      {/* Emergency Contacts */}
      <Card className="medical-card border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Phone className="w-5 h-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">{contact.name}</span>
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${contact.number}`}>{contact.number}</a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="medical-card">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Prevention</h3>
            <p className="text-sm text-muted-foreground">Learn about HIV prevention methods and safe practices</p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Treatment</h3>
            <p className="text-sm text-muted-foreground">Understanding HIV treatment and medication adherence</p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Support</h3>
            <p className="text-sm text-muted-foreground">Connect with support groups and counseling services</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-hiv">
              <AccordionTrigger>What is HIV?</AccordionTrigger>
              <AccordionContent>
                HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. 
                If HIV is not treated, it can lead to AIDS (Acquired Immunodeficiency Syndrome). 
                With proper medical care, HIV can be controlled and people can live long, healthy lives.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-transmitted">
              <AccordionTrigger>How is HIV transmitted?</AccordionTrigger>
              <AccordionContent>
                HIV is transmitted through contact with certain body fluids from a person who has HIV. 
                The most common ways are through unprotected sex, sharing needles, and from mother to child during pregnancy, 
                birth, or breastfeeding. HIV cannot be transmitted through casual contact like hugging or sharing food.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prevention">
              <AccordionTrigger>How can I prevent HIV?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Key prevention methods include:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Using condoms consistently and correctly</li>
                    <li>Getting tested and knowing your partner's status</li>
                    <li>Limiting number of sexual partners</li>
                    <li>Never sharing needles or injection equipment</li>
                    <li>Taking PrEP (pre-exposure prophylaxis) if at high risk</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testing">
              <AccordionTrigger>When should I get tested?</AccordionTrigger>
              <AccordionContent>
                The CDC recommends that everyone between ages 13-64 get tested at least once as part of routine healthcare. 
                You should get tested more frequently if you have multiple partners, use injection drugs, or have other risk factors. 
                If you think you've been exposed, wait at least 3 weeks after potential exposure for accurate results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="treatment">
              <AccordionTrigger>What if I test positive?</AccordionTrigger>
              <AccordionContent>
                A positive HIV test result doesn't mean you have AIDS. With today's medications (called antiretroviral therapy or ART), 
                people with HIV can live long, healthy lives. The key is to start treatment as soon as possible and take medications 
                as prescribed. When HIV is well-controlled, it becomes undetectable and untransmittable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger>Where can I get support?</AccordionTrigger>
              <AccordionContent>
                Support is available through various channels including healthcare providers, support groups, 
                counseling services, and community organizations. In Tagum City, you can contact the City Health Office 
                or local HIV support groups. Online resources and national hotlines are also available 24/7.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Myth Busters */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <AlertCircle className="w-5 h-5" />
            Common Myths vs Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-destructive pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive">MYTH</Badge>
              <span className="font-medium">You can get HIV from toilet seats or mosquito bites</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-primary">FACT</Badge>
              <span className="text-sm">HIV cannot survive outside the human body and cannot be transmitted through casual contact</span>
            </div>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive">MYTH</Badge>
              <span className="font-medium">HIV always leads to AIDS and death</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-primary">FACT</Badge>
              <span className="text-sm">With proper treatment, people with HIV can live normal lifespans without developing AIDS</span>
            </div>
          </div>

          <div className="border-l-4 border-destructive pl-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive">MYTH</Badge>
              <span className="font-medium">People with HIV can't have children</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-primary">FACT</Badge>
              <span className="text-sm">With proper medical care, people with HIV can have healthy children</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};