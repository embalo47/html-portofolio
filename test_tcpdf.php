<?php
require_once 'libs/tcpdf/tcpdf.php';

// Criar um novo PDF
$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 16);
$pdf->Cell(0, 10, 'TCPDF Funcionando!', 1, 1, 'C');

// Gerar o PDF
$pdf->Output('tcpdf_teste.pdf', 'I');
?>
