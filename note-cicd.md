master -> production ? 我们现在用的

branch | 给谁用的
feature -> dev/feature branch
  ↓ 改动之后，发pull request
master -> test environment 立即部署
  ↓ 发pr之后，test环境是 real time update
staging -> staging environment：为了在上线之前最后做一些测试：UAT测试在staging环境做。相当于内部的production环境。 1个周期之后部署
  ↓ 从test环境更新到staging环境的更新周期 1 day/ 1 week/ 1 sprint
production -> production environment 1个周期之后部署

CI - continuous integration 持续集成
CD - continuous deployment 持续部署

每一次部署是CD在做，CI发生在每一次部署之前，我们的代码进入环境之前都会经历CI，CI其实是在跑各种测试：pull request时review代码的自动化测试，代码格式规范的静态扫描，项目能否正常build的测试