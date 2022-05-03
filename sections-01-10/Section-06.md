## Section 6: Introducing version control with git and github
Introduction to Git and Github: Git is version control, Github is where you can store your code so multiple people can work on it. Version control is about being able to track changes over time.

Git is a local tool installed on your computer for managing your code, orgaized in repositories.

Github is a cloud hosting provider for git repositories.

Skipped command line introduction for Mac and Windows

## Day 9 - 2022-04-18
### Going through course content for day 12:
Continuing with Git basics, skipped installation instructions for Mac and Windows.

The repository contains commits which is a code snapshot, branches are where the commits are stored.

### Going through course content for day 13:

In VS Code, go to preferences->settings and search for "code lense". Make sure it is activated for merge conflicts.

Rename the branch you are on: ```git branch -m <new name>```

Create a new branch and switch to it: ```git checkout -b <new name>```

Merge branches works from the branch you are on, receiving changes from another branch. So from main branch, merging in new features from feature branch: ```git merge feature```

In case of merge conflicts: ```Accept current change``` to keep what is on the branch you are currently on. ```Accept incoming change``` accepts the changes from the feature branch. Haven't looked at ```Accept both changes``` or ```compare changes``` yet.

<b>Deleting data</b><br>
If you delete a file using VS Code or the command line, you will have to add the file to be staged for commit. If the file is deleted with git, it is automaically added and ready to be commited: ```git rm <file>```

To delete a commit, or in other words, go back to a previous commit: ```git reset --hard HEAD~1```. This resets to HEAD minus one commit, so the previous commit to the latest.

To delete a branch, first you have to be on another branch than the one you want to delete. Then ```git branch -D <branch name>```

If you have made changes to file but want to delete them, you can reset to the latest commit: ```git checkout -- .``` When you have unstaged changes you can't change branches, so you will either have to commit them, delete them, or stash them. Stash is more advanced and not part of this course.

To remove changes that have been added to staging: ```git reset <filename>```. Then reset to latest commit. We can also remove just the changes for an individual file with the same command: ```git checkout -- <filename>``` after it has been reset.

<b>Github</b><br>
Connect local repository to Github, link to my other git document for this.

```Origin``` is a standard naming convention that can be changed but it is not recommended. It is simply a short name for the url of the remote repository. This means we only have to add origin and not the entire url all the time when making changes to remote.

In ```git push -u origin main``` the "-u" can be omitted as it's for upstream which is not relevant to us now. (Will want to investigate this.)

<b>Personal Access Token</b><br>
After having connected a local repository to a newly created one on Github, after you push for the first time, VS Code will probably ask you about credentials. We'll use a token to authenticate.

To create a Personal Access Token, on Github go to settings, scroll down to developer settings and then personal access token. I guess this is for https access, but I'm using SSH-keys.

Anyone who has this token can access any repository on the account it was created for, so be careful with it!

Click cancel on the VS Code pop-up, and see that you're asked for your Github username. Enter this. Then instead of typing in your password, enter your personal access token copied when you generated it.

To delete this token on Windows, in case you want to add a new one:
```zsh
$ git credential reject <enter>
host=github.com <enter>
protocol=https <enter><enter>
```
On Mac, instead use: ```git credential-osxkeychain erase```. The rest is the same as on Windows.

### Going through course content for day 14:
<b>Personal Access Token and git clone</b><br>
To download an existing repository to a new machine use git clone with the address to the repository. If you want to push, you will again need access, meaning entering the username and the access token.

<b>Collaborating on projects</b><br>
On the repository you want to collaborate on, go to settings for the repository (not your Github account) and select manage access. Search for Github account to add by username, full name or email, then add the person found. The other person will get an invite that has to be accepted. This person can now push changes to this repository.

Git pull to get the latest from origin. (Or ```git fetch``` and then ```git merge```, the last command without any branch names)

<b>Forks and pull requests</b><br>
If you're not a direct contributer and can't change code in a repository directly, can you still contribute? Yes, by forking the repository you get a copy on your own account. This you can make changes to, add collaborators to and so on as if it was your own project. If you've made improvements you think the original project should have, you can open a pull request to the original repository. It is up to the original repository collaborators if they want to accept the pull request or not.
