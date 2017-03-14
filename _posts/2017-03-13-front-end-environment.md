---
date:   2017-03-13
categories: tip,how-to
---
# Let's get up and running with front-end development
First.. I'm a macintosh user, so if you're using Windows, this guide might be hard to follow step-by-step. Second; this guide is very opinonated and just shows how to get up and running with the most common tools within html/css/js development.

![Npm install everything]({{ site.baseurl }}/assets/images/journal-npmsavedev.png)

## Goal
Install all the basic tools; Homebrew, Git, Ruby, Rails, Node JS (incl. NPM), Yarn, Atom, Hyper Terminal.

## 1. Xcode Command Line Tools
This step is required before we start installing anything else, if you already have the full Xcode app installed on your machine, you can skip this step.

To install the Xcode Command Line Tools, run the following command in your terminal (without "$"):

```
$ xcode-select --install
```

A dialog box will open after you enter the command, make sure you click install

![Xcode Command Line Tools]({{ site.baseurl }}/assets/images/journal-xcodeinstall.png)

## 2. Homebrew
Homebrew is the most popular package manager for macOS, we will use this to install tools throughout this guide.
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 3. Git
macOS comes with git built-in, but it's outdated - so let us install it via Homebrew
```
$ brew install git
```

### Now let's set it up
