import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import BigNumber from './components/BigNumber';
import StatGrid from './components/StatGrid';
import CountUp from './components/CountUp';
import Table from './components/Table';
import Bento from './components/Bento';
import { BarChart, LineChart } from './components/Charts';

const card: React.CSSProperties = {
  padding: 22,
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
};

/* All figures below are as reported in TCS's own Q2 FY26 ("Quarter II Ended
   FY 2025-26", filed Oct 9, 2025) fact sheet and results filing — nothing
   here is invented. Figures marked "ex one-off" exclude a one-time ₹1,135 Cr
   restructuring charge, per TCS's own presentation. */
export default function App() {
  return (
    <Deck>
      {/* Cover */}
      <Cover
        nav="Cover"
        notes="Quarter ended Sep 30, 2025. Results filed Oct 9, 2025."
        kicker="Tata Consultancy Services · Quarterly Earnings"
        title={
          <>
            Q2 FY26 <span className="accent-text">Results.</span>
          </>
        }
        subtitle="Quarter ended September 30, 2025"
        foot="Consolidated · IFRS unless noted · Source: TCS Q2 FY26 Fact Sheet, Oct 9, 2025"
      />

      {/* Headline number */}
      <BigNumber
        nav="Revenue"
        notes="Best sequential growth quarter in five quarters — lead with this."
        kicker="Revenue"
        value={<CountUp to={65799} prefix="₹" suffix=" Cr" />}
        caption="up 3.7% QoQ and 2.4% YoY in INR — the fastest sequential growth in five quarters"
        foot="$7,466 Mn in USD (+0.6% QoQ) · +0.8% QoQ in constant currency · Source: TCS Q2 FY26 Fact Sheet"
      />

      {/* Headline scorecard, part 1: profitability */}
      <StatGrid
        nav="Scorecard · profit"
        notes="The restructuring charge explains the gap between reported and ex one-off profit."
        kicker="Headline scorecard"
        title="Profitability, despite the charge."
        stats={[
          {
            value: <CountUp to={12075} prefix="₹" suffix=" Cr" />,
            label: 'Net profit',
            caption: '+1.4% YoY, after a ₹1,135 Cr charge',
          },
          {
            value: <CountUp to={25.2} decimals={1} suffix="%" />,
            label: 'Operating margin',
            caption: 'ex one-off · best in five quarters',
          },
          {
            value: <CountUp to={19.6} decimals={1} suffix="%" />,
            label: 'Net margin',
            caption: 'ex one-off restructuring charge',
          },
        ]}
      />

      {/* Headline scorecard, part 2: per-share & pipeline */}
      <StatGrid
        nav="Scorecard · per-share"
        notes="TCV signals the pipeline for coming quarters — tie it back to the demand slide."
        kicker="Headline scorecard"
        title="Per share, and the pipeline."
        stats={[
          {
            value: <CountUp to={35.67} decimals={2} prefix="₹" />,
            label: 'EPS',
            caption: 'ex one-off, adjusted basis',
          },
          {
            value: <CountUp to={11} prefix="₹" />,
            label: 'Interim dividend / share',
            caption: 'record date Oct 15, 2025',
          },
          {
            value: <CountUp to={10} prefix="$" suffix=" Bn" />,
            label: 'Order book (TCV)',
            caption: 'signed this quarter, all segments',
          },
        ]}
      />

      {/* Five-quarter trend */}
      <Slide
        nav="Five-quarter trend"
        notes="Point out that margin has expanded every quarter this year despite the revenue dip in Q1."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
            The trend
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            Five quarters of momentum.
          </h2>
        </Reveal>
        <Reveal>
          <div className="cols">
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 14 }}>
                Revenue, ₹ Cr
              </div>
              <div style={{ height: 180 }}>
                <BarChart
                  data={[
                    { label: 'Q2 FY25', value: 64259 },
                    { label: 'Q3 FY25', value: 63973 },
                    { label: 'Q4 FY25', value: 64479 },
                    { label: 'Q1 FY26', value: 63437 },
                    { label: 'Q2 FY26', value: 65799 },
                  ]}
                  height={180}
                  showValues={false}
                />
              </div>
            </div>
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 14 }}>
                Operating margin, %
              </div>
              <LineChart points={[24.1, 24.5, 24.2, 24.5, 25.2]} height={180} />
              <div
                className="foot"
                style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                <span>Q2 FY25</span>
                <span>Q2 FY26</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* Growth by domain */}
      <Slide
        nav="By industry"
        notes="BFSI is the anchor vertical; Regional Markets & Others is the weak spot."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
            Growth by domain
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            BFSI carries the mix.
          </h2>
        </Reveal>
        <Reveal>
          <Table
            columns={[
              'Vertical',
              { label: 'Share of revenue', align: 'right' },
              { label: 'YoY CC growth', align: 'right' },
              { label: 'YoY INR growth', align: 'right' },
            ]}
            rows={[
              ['BFSI', '32.2%', '+1.0%', '+7.0%'],
              ['Consumer Business', '15.3%', '-2.9%', '+3.5%'],
              ['Life Sciences & Healthcare', '10.5%', '-2.2%', '+3.9%'],
              ['Manufacturing', '8.8%', '-1.1%', '+5.4%'],
              ['Technology & Services', '8.5%', '+2.8%', '+9.4%'],
              ['Energy, Resources & Utilities', '5.9%', '+0.2%', '+5.9%'],
              ['Regional Markets & Others', '12.9%', '-18.1%', '-14.8%'],
            ]}
            highlightCol={0}
            caption="CC = constant currency. Excludes Communication & Media (5.9% share, -5.1% YoY CC). Source: TCS Q2 FY26 Fact Sheet"
          />
        </Reveal>
      </Slide>

      {/* Growth by market */}
      <Slide
        nav="By geography"
        notes="Don't rush past the India row — it's the number analysts will ask about."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
            Growth by market
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            North America anchors it. India is the outlier.
          </h2>
        </Reveal>
        <Reveal>
          <Table
            columns={[
              'Geography',
              { label: 'Share of revenue', align: 'right' },
              { label: 'YoY CC growth', align: 'right' },
              { label: 'YoY INR growth', align: 'right' },
            ]}
            rows={[
              ['North America', '48.8%', '-0.1%', '+5.0%'],
              ['UK', '17.5%', '-1.9%', '+5.2%'],
              ['Continental Europe', '15.3%', '-3.0%', '+7.6%'],
              ['Asia Pacific', '8.3%', '+2.0%', '+5.8%'],
              ['India', '5.8%', '-33.3%', '-33.3%'],
              ['MEA', '2.4%', '+12.7%', '+19.1%'],
              ['Latin America', '1.9%', '+1.8%', '+7.4%'],
            ]}
            highlightRow={4}
            caption="CC = constant currency. Source: TCS Q2 FY26 Fact Sheet"
          />
        </Reveal>
      </Slide>

      {/* Demand */}
      <Bento
        nav="Demand"
        notes="The megadeal cohort ($100M+) is thinning even as the broad base ($1M+) keeps expanding."
        kicker="Demand"
        title="Deal momentum, by segment."
        tiles={[
          {
            k: 'Order book (TCV)',
            fig: <CountUp to={10} prefix="$" suffix=" Bn" />,
            body: 'Total contract value signed this quarter, across all segments.',
            c: 6,
            r: 2,
            variant: 'glow',
          },
          {
            k: 'North America TCV',
            fig: <CountUp to={4.3} decimals={1} prefix="$" suffix=" Bn" />,
            c: 3,
          },
          {
            k: 'BFSI TCV',
            fig: <CountUp to={3.2} decimals={1} prefix="$" suffix=" Bn" />,
            c: 3,
          },
          {
            k: 'Consumer Business TCV',
            fig: <CountUp to={1.8} decimals={1} prefix="$" suffix=" Bn" />,
            c: 4,
          },
          {
            title: '$1M+ clients',
            body: '1,360 accounts, up 24 quarter-on-quarter — the broad base keeps expanding.',
            c: 4,
          },
          {
            title: '$100M+ clients',
            body: 'Down 2 to 60 this quarter — the megadeal cohort is thinning.',
            c: 4,
          },
        ]}
      />

      {/* People */}
      <StatGrid
        nav="People"
        notes="Headcount fell alongside the restructuring charge — tie the two together if asked."
        kicker="People"
        title="The workforce behind the numbers."
        stats={[
          {
            value: <CountUp to={593314} />,
            label: 'Closing headcount',
            caption: 'down from 613,069 in Q1 FY26',
          },
          {
            value: <CountUp to={13.3} decimals={1} suffix="%" />,
            label: 'Voluntary attrition (LTM)',
            caption: 'IT Services, trailing twelve months',
          },
          {
            value: <CountUp to={35.2} decimals={1} suffix="%" />,
            label: 'Women employees',
            caption: '149 nationalities represented',
          },
        ]}
      />

      {/* Cash & capability */}
      <Bento
        nav="Cash & capability"
        notes="Cash conversion above 100% of net profit is the quiet strength of the quarter."
        kicker="Cash & capability"
        title="The balance sheet, and the bench."
        tiles={[
          {
            k: 'Free cash flow',
            fig: <CountUp to={12092} prefix="₹" suffix=" Cr" />,
            body: 'Operating cash flow was 110.1% of net profit this quarter.',
            c: 6,
            variant: 'glow',
          },
          {
            k: 'Cash & investments',
            fig: <CountUp to={55950} prefix="₹" suffix=" Cr" />,
            body: 'As of Sep 30, 2025.',
            c: 6,
          },
          {
            k: 'Dividends paid',
            fig: <CountUp to={4021} prefix="₹" suffix=" Cr" />,
            body: 'This quarter, to shareholders.',
            c: 6,
          },
          {
            title: 'Talent investment',
            body: '33.4M learning hours · 159K associates upskilled in AI/ML · 2.6M competencies acquired — all year-to-date.',
            c: 6,
          },
        ]}
      />

      {/* Takeaways */}
      <Slide
        center
        nav="The takeaway"
        notes="Pause after each line — this is the summary analysts will quote back."
      >
        <h2 className="headline" style={{ marginInline: 'auto' }}>
          Three things this quarter.
        </h2>
        <Build at={1}>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Growth returned — revenue up 3.7% QoQ, the best sequential gain in five quarters.
          </p>
        </Build>
        <Build at={2}>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Profitability held — operating margin expanded to 25.2%, even after a one-time
            restructuring charge.
          </p>
        </Build>
        <Build at={3}>
          <p className="lead" style={{ marginInline: 'auto' }}>
            The mix shifted — India revenue fell 33% YoY while North America and BFSI carried
            the load.
          </p>
        </Build>
      </Slide>

      {/* Close */}
      <Slide center nav="Close" notes="Leave this on screen for questions.">
        <Reveal>
          <h2 className="display" style={{ fontSize: 'clamp(40px,7vw,88px)' }}>
            <span className="accent-text">Thank you.</span>
          </h2>
          <p className="subhead" style={{ marginTop: 16 }}>
            TCS Q2 FY26 Results · tcs.com/investor-relations
          </p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
