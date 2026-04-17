import { useState, useEffect, useMemo } from "react";

// ─── Full Mock API Data ───────────────────────────────────────────────────────

const ALL_HOLDINGS = [
  { coin: "ETH", coinName: "Ethereum", logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628", currentPrice: 216182, totalHolding: 0.0004211938732637162, averageBuyPrice: 3909.792264648455, stcg: { balance: 0.0004211938732637162, gain: 89.40775336229291 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "WETH", coinName: "Polygon PoS Bridged WETH (Polygon POS)", logo: "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332", currentPrice: 211756, totalHolding: 0.00023999998390319965, averageBuyPrice: 3599.856066001555, stcg: { balance: 0.00023999998390319965, gain: 49.957471193511736 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "MATIC", coinName: "Polygon", logo: "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745", currentPrice: 22.22, totalHolding: 2.75145540184285, averageBuyPrice: 0.6880274617804887, stcg: { balance: 2.75145540184285, gain: 59.244262152615974 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "WPOL", coinName: "Wrapped POL", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 22.08, totalHolding: 2.3172764293128694, averageBuyPrice: 0.5227311370876341, stcg: { balance: 1.3172764293128694, gain: 49.954151016387065 }, ltcg: { balance: 1, gain: 20 } },
  { coin: "GONE", coinName: "Gone", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 0.0001462, totalHolding: 696324.3075326696, averageBuyPrice: 0.00001637624055112482, stcg: { balance: 696324.3075326696, gain: 90.39943939952589 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "SOL", coinName: "SOL (Wormhole)", logo: "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png?1696522175", currentPrice: 14758.01, totalHolding: 3.469446951953614e-17, averageBuyPrice: 221.42847548590152, stcg: { balance: 3.469446951953614e-17, gain: 5.043389846205066e-13 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "FTM", coinName: "Fantom", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 52.99, totalHolding: 0.04265758808550148, averageBuyPrice: 1.7040326829291739, stcg: { balance: 0.04265758808550148, gain: 2.1877356683780986 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "USDC", coinName: "USDC", logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694", currentPrice: 85.41, totalHolding: 0.0015339999999994802, averageBuyPrice: 1.5863185433764244, stcg: { balance: 0.0015339999999994802, gain: 0.12858552735441697 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "USDC", coinName: "Bridged USDC (Polygon PoS Bridge)", logo: "https://coin-images.coingecko.com/coins/images/33000/large/usdc.png?1700119918", currentPrice: 85.41, totalHolding: 0.005806999999992795, averageBuyPrice: 1.5405071277176852, stcg: { balance: 0.005806999999992795, gain: 0.48703014510873915 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "USDT", coinName: "Arbitrum Bridged USDT (Arbitrum)", logo: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661", currentPrice: 85.42, totalHolding: 0.0001580000000558357, averageBuyPrice: 1.4988059369185402, stcg: { balance: 0.0001580000000558357, gain: 0.01325954866665267 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "LINK", coinName: "Chainlink", logo: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009", currentPrice: 1450.14, totalHolding: 0.000047233224826389, averageBuyPrice: 9.172984515948809, stcg: { balance: 0.000047233224826389, gain: 0.06806151900976895 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "OX", coinName: "OX Coin", logo: "https://coin-images.coingecko.com/coins/images/35365/large/logo.png?1708395976", currentPrice: 0.13319, totalHolding: 5, averageBuyPrice: 0.018408606024462898, stcg: { balance: 5, gain: 0.5739069698776855 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "WELT", coinName: "Fabwelt", logo: "https://coin-images.coingecko.com/coins/images/20505/large/welt.PNG?1696519911", currentPrice: 0.060863, totalHolding: 1.063542780948968, averageBuyPrice: 0.01520546569793174, stcg: { balance: 1.063542780948968, gain: 0.048558741002894576 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "SLN", coinName: "Smart Layer Network", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 6.66, totalHolding: 0.01, averageBuyPrice: 4.999247835735738, stcg: { balance: 0.01, gain: 0.016607521642642627 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "$CULO", coinName: "CULO", logo: "https://coin-images.coingecko.com/coins/images/34662/large/CULO-logo-inverted_200.png?1705641744", currentPrice: 0.00001623, totalHolding: 150000, averageBuyPrice: 0, stcg: { balance: 150000, gain: 2.4345 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "PIG", coinName: "Pigcoin", logo: "https://coin-images.coingecko.com/coins/images/35425/large/pigcoin_200.png?1708544734", currentPrice: 0.00008706, totalHolding: 1.79, averageBuyPrice: 0, stcg: { balance: 1.79, gain: 0.0001558374 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "EZ", coinName: "EasyFi V2", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 0.885074, totalHolding: 0.0005424384664524931, averageBuyPrice: 6.539367177529248, stcg: { balance: 0.0005424384664524931, gain: -0.0030671061200917595 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "FRM", coinName: "Ferrum Network", logo: "https://coin-images.coingecko.com/coins/images/8251/large/FRM.png?1696508455", currentPrice: 0.093794, totalHolding: 6.442993445432421e-7, averageBuyPrice: 0.453964789704584, stcg: { balance: 6.442993445432421e-7, gain: -2.3205780373028534e-7 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "SPHERE", coinName: "Sphere Finance", logo: "https://coin-images.coingecko.com/coins/images/24424/large/2iR2JsL.png?1696523606", currentPrice: 0.00729945, totalHolding: 2.2737367544323206e-13, averageBuyPrice: 0.011065778585432803, stcg: { balance: 2.2737367544323206e-13, gain: -8.563639733967655e-16 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "FLAME", coinName: "FireStarter", logo: "https://coin-images.coingecko.com/coins/images/17359/large/WhiteOnBlack_Primary_Logo.png?1696516910", currentPrice: 0.355985, totalHolding: 1.4210854715202004e-14, averageBuyPrice: 0.07889041030290807, stcg: { balance: 1.4210854715202004e-14, gain: 3.9377509565538836e-15 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "QUICK", coinName: "Quickswap [OLD]", logo: "https://coin-images.coingecko.com/coins/images/13970/large/quick.png?1696513704", currentPrice: 2319.83, totalHolding: 5.961538207532868e-11, averageBuyPrice: 65.86759737193783, stcg: { balance: 5.961538207532868e-11, gain: 1.3437082981609774e-7 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "DFYN", coinName: "Dfyn Network", logo: "https://coin-images.coingecko.com/coins/images/15368/large/SgqhfWz4_400x400_%281%29.jpg?1696515016", currentPrice: 0.300613, totalHolding: 3.1178615245153196e-11, averageBuyPrice: 0.03486178524947315, stcg: { balance: 3.1178615245153196e-11, gain: 8.285754875638759e-12 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "BLOK", coinName: "Bloktopia", logo: "https://coin-images.coingecko.com/coins/images/18819/large/logo-bholdus-6.png?1696518281", currentPrice: 0.02974533, totalHolding: 9.822542779147625e-11, averageBuyPrice: 0.005182145656093, stcg: { balance: 9.822542779147625e-11, gain: 2.412729290101157e-12 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "TRADE", coinName: "Polytrade", logo: "https://coin-images.coingecko.com/coins/images/16416/large/Logo_colored_200.png?1696516012", currentPrice: 17.51, totalHolding: 3.325212327709437e-11, averageBuyPrice: 0.25960465528043797, stcg: { balance: 3.325212327709437e-11, gain: 5.736122725812298e-10 }, ltcg: { balance: 0, gain: 0 } },
  { coin: "TITAN", coinName: "IRON Titanium", logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg", currentPrice: 8.65643e-7, totalHolding: 8.861, averageBuyPrice: 8.531798889329416e-7, stcg: { balance: 8.861, gain: 1.1043562716520403e-7 }, ltcg: { balance: 0, gain: 0 } },
];

const fetchCapitalGains = () =>
  new Promise((res) =>
    setTimeout(() => res({
      capitalGains: {
        stcg: { profits: 70200.88, losses: 1548.53 },
        ltcg: { profits: 5020, losses: 3050 },
      },
    }), 600)
  );

const fetchHoldings = () =>
  new Promise((res) =>
    setTimeout(() => {
      const sorted = [...ALL_HOLDINGS].sort((a, b) => {
        const totalA = a.stcg.gain + a.ltcg.gain;
        const totalB = b.stcg.gain + b.ltcg.gain;
        return totalB - totalA;
      });
      res(sorted);
    }, 800)
  );

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);

const fmtGain = (n) => {
  const abs = Math.abs(n);
  if (abs === 0) return "0.00";
  if (abs < 0.01) {
    if (abs < 1e-6) return abs.toExponential(2);
    return abs.toFixed(4);
  }
  return fmt(abs);
};

const fmtHolding = (n) => {
  if (n === 0) return "0";
  if (Math.abs(n) < 1e-8) return n.toExponential(3);
  if (Math.abs(n) < 0.0001) return n.toExponential(3);
  if (Math.abs(n) > 10000) return fmt(n);
  const s = parseFloat(n.toPrecision(6));
  return s.toString();
};

const fmtPrice = (n) => {
  if (n === 0) return "0";
  if (n < 0.001) return n.toExponential(4);
  if (n < 1) return n.toPrecision(5);
  return fmt(n);
};

const rowKey = (h) => `${h.coin}__${h.coinName}`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
    </div>
  );
}

function InfoBanner({ onClose }) {
  return (
    <div className="info-banner">
      <div className="info-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="info-text">
        <strong>How does Tax Loss Harvesting work?</strong>
        {" "}Tax Loss Harvesting allows you to reduce your tax liability by selling assets at a loss to offset your capital gains.
        Select holdings below to see the impact in real time.
      </div>
      <button className="info-close" onClick={onClose} aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

function GainRow({ label, profits, losses, net }) {
  return (
    <div className="gain-row">
      <span className="gain-label">{label}</span>
      <div className="gain-cols">
        <div className="gain-col">
          <div className="gain-meta">Profits</div>
          <div className="gain-val profit">₹{fmt(profits)}</div>
        </div>
        <div className="gain-col">
          <div className="gain-meta">Losses</div>
          <div className="gain-val loss">-₹{fmt(losses)}</div>
        </div>
        <div className="gain-col">
          <div className="gain-meta">Net Capital Gains</div>
          <div className={`gain-val ${net >= 0 ? "profit" : "loss"}`}>
            {net < 0 ? "-" : ""}₹{fmt(Math.abs(net))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CapitalGainsCard({ title, dark, stcg, ltcg, savings, isAfter }) {
  const netST = stcg.profits - stcg.losses;
  const netLT = ltcg.profits - ltcg.losses;
  const realised = netST + netLT;

  return (
    <div className={`card ${dark ? "card-dark" : "card-blue"}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <GainRow label="Short-Term" profits={stcg.profits} losses={stcg.losses} net={netST} />
      <div className="divider" />
      <GainRow label="Long-Term" profits={ltcg.profits} losses={ltcg.losses} net={netLT} />
      <div className="divider" />

      <div className="realised-row">
        <span className="realised-label">Realised Capital Gains</span>
        <span className={`realised-val ${realised >= 0 ? "profit" : "loss"}`}>
          {realised < 0 ? "-" : ""}₹{fmt(Math.abs(realised))}
        </span>
      </div>

      {isAfter && savings !== null && savings > 0 && (
        <div className="savings-banner">
          <span className="savings-emoji">🎉</span>
          <span>You&apos;re going to save <strong>₹{fmt(savings)}</strong> in taxes!</span>
        </div>
      )}
    </div>
  );
}

function HoldingRow({ holding, rKey, selected, onToggle }) {
  const stcgGain = holding.stcg.gain;
  const ltcgGain = holding.ltcg.gain;

  return (
    <tr
      className={`holding-row ${selected ? "selected" : ""}`}
      onClick={() => onToggle(rKey)}
    >
      <td className="td-check" onClick={(e) => e.stopPropagation()}>
        <label className="cb-wrap" onClick={() => onToggle(rKey)}>
          <input type="checkbox" className="sr-only" checked={selected} onChange={() => onToggle(rKey)} />
          <span className={`checkbox ${selected ? "checked" : ""}`}>
            {selected && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </label>
      </td>

      <td className="td-asset">
        <div className="asset-info">
          <img
            src={holding.logo}
            alt={holding.coin}
            className="coin-logo"
            onError={(e) => {
              e.target.src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
            }}
          />
          <div>
            <div className="coin-symbol">{holding.coin}</div>
            <div className="coin-name">{holding.coinName}</div>
          </div>
        </div>
      </td>

      <td className="td-holdings">
        <div className="num">{fmtHolding(holding.totalHolding)}</div>
        <div className="sub">Avg: ₹{fmtPrice(holding.averageBuyPrice)}</div>
      </td>

      <td className="td-price">
        <div className="num">₹{fmtPrice(holding.currentPrice)}</div>
      </td>

      <td className="td-gain">
        <div className={`num ${stcgGain >= 0 ? "profit" : "loss"}`}>
          {stcgGain < 0 ? "-" : ""}₹{fmtGain(stcgGain)}
        </div>
        <div className="sub">{fmtHolding(holding.stcg.balance)} units</div>
      </td>

      <td className="td-gain">
        <div className={`num ${ltcgGain >= 0 ? "profit" : "loss"}`}>
          {ltcgGain < 0 ? "-" : ""}₹{fmtGain(ltcgGain)}
        </div>
        <div className="sub">{fmtHolding(holding.ltcg.balance)} units</div>
      </td>

      <td className="td-sell">
        {selected ? (
          <div className="sell-chip">{fmtHolding(holding.totalHolding)}</div>
        ) : (
          <span className="sell-placeholder">—</span>
        )}
      </td>
    </tr>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const INITIAL_SHOW = 5;

export default function App() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loadingGains, setLoadingGains] = useState(true);
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);
  const [infoClosed, setInfoClosed] = useState(false);

  useEffect(() => {
    fetchCapitalGains()
      .then((d) => setCapitalGains(d.capitalGains))
      .catch(() => setError("Failed to load capital gains data."))
      .finally(() => setLoadingGains(false));

    fetchHoldings()
      .then(setHoldings)
      .catch(() => setError("Failed to load holdings data."))
      .finally(() => setLoadingHoldings(false));
  }, []);

  const allKeys = holdings.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));
  const someSelected = allKeys.some((k) => selected.has(k));

  const toggleRow = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(allKeys));
  };

  const afterGains = useMemo(() => {
    if (!capitalGains) return null;
    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    holdings.forEach((h) => {
      if (!selected.has(rowKey(h))) return;
      if (h.stcg.gain > 0) stcgProfits += h.stcg.gain;
      else if (h.stcg.gain < 0) stcgLosses += Math.abs(h.stcg.gain);
      if (h.ltcg.gain > 0) ltcgProfits += h.ltcg.gain;
      else if (h.ltcg.gain < 0) ltcgLosses += Math.abs(h.ltcg.gain);
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [capitalGains, holdings, selected]);

  const preRealised = capitalGains
    ? (capitalGains.stcg.profits - capitalGains.stcg.losses) +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses)
    : 0;

  const postRealised = afterGains
    ? (afterGains.stcg.profits - afterGains.stcg.losses) +
      (afterGains.ltcg.profits - afterGains.ltcg.losses)
    : 0;

  const savings = preRealised > postRealised ? preRealised - postRealised : null;

  const visibleHoldings = showAll ? holdings : holdings.slice(0, INITIAL_SHOW);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-koin">Koin</span><span className="logo-x">X</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link active">Tax Harvesting</a>
            <a href="#" className="nav-link">Portfolio</a>
          </nav>
        </div>
      </header>

      <main className="main">
        {/* ── Page Title ── */}
        <div className="page-title-block">
          <h1 className="page-title">Tax Loss Harvesting</h1>
          <p className="page-sub">
            Optimise your crypto taxes by strategically selling assets at a loss to offset your gains.
          </p>
        </div>

        {!infoClosed && <InfoBanner onClose={() => setInfoClosed(true)} />}

        {error && <div className="error-banner">⚠ {error}</div>}

        {/* ── Capital Gains Cards ── */}
        {loadingGains ? (
          <div className="cards-loading"><Spinner /></div>
        ) : capitalGains ? (
          <div className="cards-grid">
            <CapitalGainsCard
              title="Pre Harvesting"
              dark={true}
              stcg={capitalGains.stcg}
              ltcg={capitalGains.ltcg}
              savings={null}
              isAfter={false}
            />
            <CapitalGainsCard
              title="After Harvesting"
              dark={false}
              stcg={afterGains.stcg}
              ltcg={afterGains.ltcg}
              savings={savings}
              isAfter={true}
            />
          </div>
        ) : null}

        {/* ── Holdings Table ── */}
        <div className="table-section">
          <div className="table-header-row">
            <div className="table-header-left">
              <h2 className="table-title">Holdings</h2>
              {!loadingHoldings && (
                <span className="holdings-count">{holdings.length} assets</span>
              )}
            </div>
            {!loadingHoldings && someSelected && (
              <button className="clear-btn" onClick={() => setSelected(new Set())}>
                Clear selection
              </button>
            )}
          </div>

          {loadingHoldings ? (
            <Spinner />
          ) : (
            <>
              <div className="table-wrap">
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th className="th-check">
                        <label className="cb-wrap" style={{ cursor: "pointer" }}>
                          <input type="checkbox" className="sr-only" checked={allSelected} onChange={toggleAll} />
                          <span className={`checkbox ${allSelected ? "checked" : someSelected ? "indeterminate" : ""}`}>
                            {allSelected && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {!allSelected && someSelected && (
                              <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                                <path d="M1 1H7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            )}
                          </span>
                        </label>
                      </th>
                      <th>Asset</th>
                      <th>Holdings &amp; Avg Buy Price</th>
                      <th>Current Price</th>
                      <th>Short-Term Gain</th>
                      <th>Long-Term Gain</th>
                      <th>Amount to Sell</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleHoldings.map((h) => {
                      const key = rowKey(h);
                      return (
                        <HoldingRow
                          key={key}
                          rKey={key}
                          holding={h}
                          selected={selected.has(key)}
                          onToggle={toggleRow}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {holdings.length > INITIAL_SHOW && (
                <button className="view-all-btn" onClick={() => setShowAll((v) => !v)}>
                  {showAll ? "Show Less ↑" : `View All ${holdings.length} Holdings ↓`}
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
