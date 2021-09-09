select 
		d.den_cd,
		den_logr_tp, 
        den_logr_ds, 
        den_logr_num, 
        den_logr_bairro, 
        den_logr_subbairro, 
        den_logr_cep, 
        den_logr_mun , 
        den_loc_ref,
        den_dt_rec,
		at.tpa_ds
from (dd.dbo.assunto_denuncia a JOIN dd.dbo.assunto_tipo at ON (a.ass_tpa_cd = at.tpa_cd))  JOIN dd.dbo.denuncia d ON (d.den_cd = a.ass_den_cd)
