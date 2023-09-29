# Invenco Prismatic Demo Component

This project demonstrates how we define and build Prismatic Components.

## Setup

Clone the repo and install the dependencies:
```bash
git clone git@github.com:invenco/prismatic-demo-component.git
cd prismatic-demo-component
yarn
```

## Build the component   

Run the `build` script to compile the source code. The output will be saved into **./lib/lynkV2**.
```bash
yarn build
```

To build unminified, run the `build` script with the `BUILD_UNMINIFIED` environment variable set to `1`:
```bash
BUILD_UNMINIFIED=1 yarn build
```

## A note on publishing

This project defines multiple component packages that are built into independent bundles. After you run the `build`
script you can see in **./lib** that there is one directory for each component package. 

This causes a bit of a problem when it comes time to publish each independent package. When using the `prism` CLI tool to
publish a component package to Prismatic, `prism` expects the component code to be in **./dist**. However, since we
build each of our component packages into **./lib/[package_name]/dist**, the publish step fails. To solve this, create a
symlink from **./dist** to **./lib/[package_name]/dist** and then publish that package. The `publish` script does this
automatically.

The public script logic works like this:

1. Get the list of directories in **./lib** and for each one:
   1. Delete any existing **./dist** symlink (or fail if it is not a symlink)
   2. Create a symlink from **./dist** to **./lib/[package_name]/dist**
   3. Run `prism components:publish` to publish the component package to Prismatic
2. Delete **./dist** symlink