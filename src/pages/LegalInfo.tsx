import FullScreen from "@/components/FullScreen";
import { Scale } from "lucide-react";

interface LegalInfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const LegalInfoButton = ({
  pageIndex,
  onClick,
}: LegalInfoButtonProps) => {
  if (pageIndex === 0) {
    return null;
  }

  if (pageIndex !== 1) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="z-2 absolute bottom-0 left-32 m-2"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-2.5 py-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/55">
        <Scale size={12} />
        <span className="text-2xs font-semibold">
          {"Impressum & Datenschutz"}
        </span>
      </div>
    </button>
  );
};

const legalInfo = [
  {
    title: "IMPRESSUM",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p className="mb-2 font-bold">HocusFocus</p>
        <p>
          Muriel Antoun
          <br />
          Bleichstraße 48
          <br />
          17489 Greifswald
          <br />
          muriel.antoun@stud.uni-greifswald.de
          <br />
          +49 176 55598461
        </p>
        <p className="mt-4">
          Erstellt im Rahmen einer Masterarbeit an der Universität Greifswald.
        </p>
        {/* ??? */}
        <p>
          <span className="font-bold">Disclaimer:</span> Die Nutzungvon
          HocusFocus ersetzt keine Therapie
        </p>
      </div>
    ),
  },
  {
    title: "DATENSCHUTZERKLÄRUNG",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p>
          <strong className="font-bold">Verantwortlicher</strong>
          <br />
          Muriel Antoun
          <br />
          muriel.antoun@stud.uni-greifswald.de
        </p>
        <p>
          Konzept & Animation: Muriel Antoun <br />
          Programmierung: Théo Carrara, Muriel Antoun
        </p>

        <p>
          <strong className="font-bold">Erhobene Daten</strong>
          <br />
          Diese Website speichert keine personenbezogenen Daten auf Servern. Der
          Benutzername wird lokal im Browser des Nutzers in der Local Storage
          gespeichert. Es erfolgt keine Übertragung dieser Daten an unsere
          Server.
        </p>

        <p>
          <strong className="font-bold">Rechte der Nutzer</strong>
          <br />
          Benutzer haben das Recht, gespeicherte Daten im Browser selbstständig
          zu löschen. Da keine Daten an uns übermittelt werden, können wir keine
          darüber hinausgehenden Rechte wie Löschung oder Berichtigung von Daten
          auf unseren Systemen anbieten.
        </p>

        <p>
          <strong className="font-bold">
            Keine Verwendung von Cookies oder Tracking
          </strong>
          <br />
          Unsere Website verwendet keine Cookies, Tracking-Tools oder
          Analysetools.
        </p>

        <p>
          <strong className="font-bold">
            Rechtsgrundlage der Datenverarbeitung
          </strong>
          <br />
          Die lokale Speicherung des Benutzernamens erfolgt ausschließlich zur
          Nutzung der Website und basiert auf der Zustimmung des Nutzers durch
          die aktive Eingabe.
        </p>

        <p>
          <strong className="font-bold">Hosting durch Vercel</strong>
          <br />
          Diese Website wird von Vercel gehostet. Möglicherweise werden durch
          Vercel Daten wie IP-Adressen oder Zugriffsprotokolle gespeichert.
          Details dazu entnehmen Sie bitte der Datenschutzerklärung von Vercel.
        </p>
      </div>
    ),
  },
  {
    title: "QUELLEN",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4 prose-p:text-sm">
        <p className="mb-1 italic">
          Die folgenden Quellen haben das Design und die Entwicklung von
          HocusFocus direkt informiert.
        </p>

        <p className="mt-3 mb-1 font-bold">Verstärkungssysteme</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Bubnik, M. G. et al. (2015). Reinforcement Enhances Vigilance Among
            Children With ADHD. <em>Journal of Abnormal Child Psychology, 43</em>
            (1), 149–161.
          </li>
          <li>
            Cameron, J. et al. (2001). Pervasive Negative Effects of Rewards on
            Intrinsic Motivation: The Myth Continues.
          </li>
          <li>
            Deci, E. L. et al. (1999). A meta-analytic review of experiments
            examining the effects of extrinsic rewards on intrinsic motivation.{" "}
            <em>Psychological Bulletin, 125</em>(6), 627–668.
          </li>
          <li>
            De Meyer, H. et al. (2019). Reinforcement Contingency Learning in
            Children with ADHD. <em>Journal of Abnormal Child Psychology, 47</em>
            (12), 1889–1902.
          </li>
          <li>
            Kim, S.-C. (2025). Verification of the Effectiveness of a Token
            Economy Method Through Digital Intervention Content for Children with
            ADHD. <em>Bioengineering, 12</em>(10), 1035.
          </li>
          <li>
            Luman, M. et al. (2005). The impact of reinforcement contingencies on
            AD/HD: A review and theoretical appraisal.{" "}
            <em>Clinical Psychology Review, 25</em>(2), 183–213.
          </li>
          <li>
            Pyle, K. & Fabiano, G. (2017). Daily Report Card Intervention and
            ADHD: A Meta-Analysis of Single-Case Studies.
          </li>
        </ul>

        <p className="mb-1 font-bold">Selbstwirksamkeit</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Bandura, A. (1993). Perceived Self-Efficacy in Cognitive Development
            and Functioning. <em>Educational Psychologist, 28</em>(2), 117–148.
          </li>
          <li>
            Gambin, M. & Święcicka, M. (2015). Relationships of self-efficacy
            beliefs to executive functions, hyperactivity-impulsivity and
            inattention. <em>Polish Journal of Applied Psychology, 13</em>(1),
            33–42.
          </li>
        </ul>

        <p className="mb-1 font-bold">Wettbewerb</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Geurts, H. M. et al. (2008). What's in a game: the effect of social
            motivation on interference control in boys with ADHD.{" "}
            <em>Journal of Child Psychology and Psychiatry, 49</em>(8), 848–857.
          </li>
        </ul>

        <p className="mb-1 font-bold">Gamification</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Alabdulakareem, E. & Jamjoom, M. (2020). Computer-assisted learning
            for improving ADHD individuals' executive functions through gamified
            interventions. <em>Entertainment Computing, 33</em>, 100341.
          </li>
          <li>
            Dai, J. et al. (2025). Effectiveness of a gamified educational
            application on attention and academic performance in children with
            ADHD. <em>Frontiers in Education, 10</em>, 1668260.
          </li>
          <li>
            Kim, J. & Castelli, D. M. (2021). Effects of Gamification on
            Behavioral Change in Education: A Meta-Analysis. <em>IJERPH, 18</em>
            (7), 3550.
          </li>
          <li>
            Li, L. et al. (2024). Gamification enhances student intrinsic
            motivation, perceptions of autonomy and relatedness.{" "}
            <em>
              Educational Technology Research and Development, 72
            </em>
            (2), 765–796.
          </li>
          <li>
            Sailer, M. & Homner, L. (2020). The Gamification of Learning: a
            Meta-analysis. <em>Educational Psychology Review, 32</em>(1), 77–112.
          </li>
        </ul>

        <p className="mb-1 font-bold">Stärkenbasierter Ansatz</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Climie, E. A. & Mastoras, S. M. (2015). ADHD in schools: Adopting a
            strengths-based perspective. <em>Canadian Psychology, 56</em>(3),
            295–300.
          </li>
          <li>
            Schippers, L. M. et al. (2022). A qualitative and quantitative study
            of self-reported positive characteristics of individuals with ADHD.{" "}
            <em>Frontiers in Psychiatry, 13</em>, 922788.
          </li>
          <li>
            Zabar-Cahanovich, Y. et al. (2025). Diagnosis Identity Perception in
            Adolescents with ADHD. <em>Children, 12</em>(11), 1532.
          </li>
        </ul>

        <p className="mb-1 font-bold">Digitale Interventionen</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            Lin, J. & Chang, W.-R. (2025). Effectiveness of Serious Games as
            Digital Therapeutics for Enhancing the Abilities of Children with
            ADHD. <em>JMIR Serious Games, 13</em>, e60937.
          </li>
          <li>
            Păsărelu, C. R. et al. (2020). Attention-deficit/hyperactivity
            disorder mobile apps: A systematic review. <em>IJMI, 138</em>,
            104133.
          </li>
        </ul>

        <p className="mb-1 font-bold">Inhalte & Feature-Design</p>
        <ul className="mb-3 list-none space-y-1 pl-0 text-sm">
          <li>
            APA (2013).{" "}
            <em>
              Diagnostic and Statistical Manual of Mental Disorders
            </em>{" "}
            (5th ed., DSM-5).
          </li>
          <li>
            Barkley, R. A. et al. (1997). Sense of time in children with ADHD.{" "}
            <em>JINS, 3</em>(4), 359–369.
          </li>
          <li>
            Barkley, R. A. (2015).{" "}
            <em>
              Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis
              and Treatment
            </em>{" "}
            (4th ed.).
          </li>
          <li>
            Bertilsdotter Rosqvist, H. et al. (2023). Intensity and Variable
            Attention: Counter Narrating ADHD.{" "}
            <em>British Journal of Social Work, 53</em>(8), 3647–3664.
          </li>
          <li>
            Bitsakou, P. et al. (2009). Delay Aversion in ADHD: An empirical
            investigation. <em>Neuropsychologia, 47</em>(2), 446–456.
          </li>
          <li>
            Kofler, M. J. et al. (2018). Working memory and organizational skills
            problems in ADHD. <em>JCPP, 59</em>(1), 57–67.
          </li>
          <li>
            Morris, D. et al. (2025). Content of ADHD psychoeducation packages:
            scoping review. <em>BJPsych Bulletin, 50</em>(2), 163–174.
          </li>
          <li>
            Soler-Gutiérrez, A.-M. et al. (2023). Evidence of emotion
            dysregulation as a core symptom of adult ADHD. <em>PLOS ONE, 18</em>
            (1), e0280131.
          </li>
          <li>
            Sonuga-Barke, E. J. S. et al. (1992). Hyperactivity and Delay
            Aversion—I. <em>JCPP, 33</em>(2), 387–398.
          </li>
          <li>
            Visser, M. J. et al. (2025). Unmet Needs of Children and Young Adults
            With ADHD: Insights for Stigma Reduction.{" "}
            <em>Journal of Attention Disorders, 29</em>(3), 195–206.
          </li>
          <li>
            Young, S. et al. (2020). Females with ADHD: An expert consensus
            statement. <em>BMC Psychiatry, 20</em>(1).
          </li>
        </ul>
      </div>
    ),
  },
];

interface LegalInfoProps {
  onClose: () => void;
}

const LegalInfo = ({ onClose }: LegalInfoProps) => {
  return (
    <FullScreen onClose={onClose}>
      <div className="h-full w-full overflow-y-scroll px-8 text-black">
        <h1 className="center mb-4 text-2xl font-bold">
          RECHTLICHE INFORMATIONEN
        </h1>
        {legalInfo.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-xl font-bold">{section.title}</h2>
            <div className="rounded-md bg-amber-100 p-4">{section.content}</div>
          </div>
        ))}
      </div>
    </FullScreen>
  );
};

export default LegalInfo;
