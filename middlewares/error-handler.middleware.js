export default function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ errorMessage: "올바르지 않은 데이터입니다." });
  } else if (err.name === "noData") {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  } else if (err.name === "pwDifferent") {
    return res.status(401).json({
      message: "패스워드가 일치하지 않습니다.",
    });
  }

  return res.status(500).json({ message: "서버 접속에 실패하였습니다." });
}
