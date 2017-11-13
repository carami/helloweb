<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>main</title>
</head>
<body>

<h1>hello world!</h1>

<br><br>

<c:forEach items="${records}"
           var="record">
    <c:out value="${record}" /> <br />
</c:forEach>

</body>
</html>
