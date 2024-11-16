module.exports = ({ github, core }) => {
  main(github, core);
};

async function main(github, core) {
  const release = await github.rest.repos.getLatestRelease({
    owner: "gohugoio",
    repo: "hugo",
  });

  const version = release.data.tag_name;

  const asset = release.data.assets.find(
    (asset) =>
      asset.name.includes("extended") &&
      asset.name.includes("Linux-64bit") &&
      asset.name.endsWith(".tar.gz"),
  );

  if (!asset) {
    throw new Error("No Hugo release binary found");
  }

  core.setOutput("download_url", asset.browser_download_url);
  core.setOutput("version", version);

  console.log(`Found Hugo ${version}`);
  console.log(`Download URL: ${asset.browser_download_url}`);
}
