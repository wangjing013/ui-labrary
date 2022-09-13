export const getThirdPartyUserid = (env: string) => {
  let userid;
  console.log(env);
  switch (env) {
    case "test":
      userid = "106412F2807CF45F";
      break;
    case "beta":
    case "prod":
      userid = "D9A0CF224BF92F5B";
      break;
    default:
      break;
  }
  return userid;
};
