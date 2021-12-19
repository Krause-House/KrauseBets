const teams = {
  ATL: ["atlanta hawks", "hawks", "atl", "atlanta"],
  BOS: ["boston celtics", "celtics", "boston", "bos"],
  BKN: ["brooklyn nets", "nets", "bkn", "brooklyn"],
  CHA: ["charlotte hornets", "hornets", "cha", "charlotte"],
  CHI: ["chicago bulls", "bulls", "chi", "chicago"],
  CLE: ["cleveland cavaliers", "cavaliers", "cle", "cleveland", "cavs"],
  DAL: ["dallas mavericks", "mavericks", "dallas", "dallas mavs", "mavs"],
  DEN: ["denver nuggets", "nuggets", "den", "denver", "nugs"],
  DET: ["detroit pistons", "pistons", "det", "detroit"],
  GSW: ["golden state warriors", "warriors", "gsw", "golden state", "warrior"],
  HOU: ["houston rockets", "rockets", "hou", "houston"],
  IND: ["indiana pacers", "pacers", "ind", "indiana"],
  LAC: ["los angeles clippers", "clippers", "lac"],
  LAL: ["los angeles lakers", "lakers", "lal"],
  MEM: ["memphis grizzlies", "grizzlies", "mem", "memphis"],
  MIA: ["miami heat", "heat", "mia", "miami"],
  MIL: ["milwaukee bucks", "bucks", "mil", "milwaukee", "mke"],
  MIN: ["minnesota timberwolves", "timberwolves", "min", "minnesota"],
  NOP: ["new orleans pelicans", "pelicans", "nop", "new orleans", "nola"],
  NYK: ["new york knicks", "knicks", "nyk", "new york"],
  OKC: ["oklahoma city thunder", "thunder", "okc", "oklahoma city"],
  ORL: ["orlando magic", "magic", "orl", "orlando"],
  PHI: ["philadelphia 76ers", "76ers", "phi", "philadelphia"],
  PHX: ["phoenix suns", "suns", "phx", "phoenix"],
  POR: ["portland trail blazers", "trail blazers", "por", "portland"],
  SAC: ["sacramento kings", "kings", "sac", "sacramento"],
  SAS: ["san antonio spurs", "spurs", "sas", "san antonio"],
  TOR: ["toronto raptors", "raptors", "tor", "toronto"],
  UTA: ["utah jazz", "jazz", "uta", "utah", "uth"],
  WAS: ["washington wizards", "wizards", "was", "washington"],
};

function getTeamAbbreviation(teamName) {
  for (let team in teams) {
    if (teams[team].includes(teamName.toLowerCase())) {
      return team;
    }
  }
  return "UNK";
}

module.exports = getTeamAbbreviation;
