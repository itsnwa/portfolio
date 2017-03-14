---
date:   2017-03-13
categories: tip,how-to
---
# Let's get up and running with front-end development
First.. I'm a macintosh user, so if you're using Windows, this guide might be hard to follow step-by-step. Second; this guide is very opinonated and just shows how to get up and running with the most common tools within HTML/CSS/JS development.

## Oh my zsh!
Ok, this is probably not the most important step, but as a developer, you're spending a lot of your time inside the terminal, so let's make it good.

![Hyper Terminal Screenshot]({{ site.baseurl }}/assets/images/journal-hyper-terminal.jpg)

First step is to install latest version of zsh:
```
$ brew install zsh
```

Second, let's change our system shell from bash to zsh:

```
$
```

Optional: Instead of using the standard macOS terminal, let's join the cool kids and install the new super hackable Hyper Terminal 😎

```
$ brew cask install hyper
```

Hyper can be tweaked in every imaginable way, but I will just post my preferred setup for now. If you want more – you should check out this [awesome](https://github.com/bnb/awesome-hyper) collection.

## Xcode Command Line Tools
This step is required before we start installing anything else, if you already have the full Xcode app installed on your machine, you can skip this step.

To install the Xcode Command Line Tools, run the following command in your terminal (without `$`):

```
$ xcode-select --install
```

A dialog box will open after you enter the command, make sure you click install.

## Homebrew
Homebrew is the most popular package manager for macOS, we will use this to install tools throughout this guide.
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Git
macOS comes with git built-in, but it's outdated - so let us install it via Homebrew
```
$ brew install git
```

If you don't already have a GitHub account, go to [gitbub.com](https://github.com/) and set one up first.

Next, we need to register your credentials on your machine so you don't have to enter your username and password every time you push to your repositories.

Type in your name so that git can properly label your commits:

```
$ git config --global user.name "YOUR NAME"
```

Next, add your email associated with your github account:

```
$ git config --global user.name "YOUR NAME"
```

## Ruby with RVM
To install Ruby, I recommend that you do so with a version manager like RVM (Ruby Version Manager), with RVM you can easily swap between ruby versions when you need them.

The following command will install RVM as well as the latest stable version of Ruby.

```
$ \curl -sSL https://get.rvm.io | bash -s stable --ruby
```

## Node with NVM
Just like Ruby, Node should be installed with a version manager so we can download, change and clean out old versions with ease.
Install NVM:

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

Now, let's download the latest Node version:

```
$ nvm install node
```

If you need to install other versions of Node, you can do so by running `nvm install [version]` and to swap between versions, type `nvm use [version]`.
